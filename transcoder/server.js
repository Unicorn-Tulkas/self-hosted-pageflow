const express = require('express');
const { Client } = require('minio');
const ffmpeg = require('fluent-ffmpeg');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const https = require('https');
const http = require('http');
const url = require('url');
const { createClient } = require('redis');

const app = express();

// Redis client for persistent job storage
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'pageflow_redis'}:${process.env.REDIS_PORT || 6379}`
});

// Connect to Redis and handle errors
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    log('✅ Connected to Redis for persistent job storage');
});

// Connect to Redis
redisClient.connect().catch(console.error);

// Job storage keys
const JOBS_KEY_PREFIX = 'transcoder:job:';
const ZENCODER_MAP_PREFIX = 'transcoder:zencoder:';

// Helper function for timestamped logging
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

// Configuration constants
const REDIS_TTL_SECONDS = 86400; // 24 hours
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
const TEMP_CLEANUP_DELAY_MS = 60000; // 1 minute
const PROGRESS_LOG_INTERVAL = 10; // Log every 10%

// Helper function to parse input URLs and extract bucket/key information
function parseInputUrl(inputUrl) {
    if (inputUrl.startsWith('s3://')) {
        // S3 protocol format: s3://bucket-name/path/to/object
        const s3Parts = inputUrl.substring(5);
        const firstSlash = s3Parts.indexOf('/');
        if (firstSlash === -1) {
            throw new Error('Invalid S3 URL format: ' + inputUrl);
        }
        return {
            bucket: s3Parts.substring(0, firstSlash),
            key: decodeURIComponent(s3Parts.substring(firstSlash + 1))
        };
    } else {
        // HTTP format: http://host:port/bucket-name/path/to/object
        const urlParts = inputUrl.replace(/^https?:\/\/[^\/]+\//, '');
        const bucket = process.env.MINIO_SOURCE_BUCKET || 'pageflow-main';
        
        // Remove bucket name from path if it's included in URL
        const key = urlParts.startsWith(bucket + '/') 
            ? decodeURIComponent(urlParts.substring(bucket.length + 1))
            : decodeURIComponent(urlParts);
        
        return { bucket, key };
    }
}

// Helper function to sanitize and extract output key from URL
function parseOutputUrl(outputUrl, outputBucket, fallbackFileName) {
    let outputKey = outputUrl || fallbackFileName;
    
    // Handle different URL formats
    if (outputKey.startsWith('s3://')) {
        outputKey = outputKey.substring(5);
        const firstSlash = outputKey.indexOf('/');
        if (firstSlash !== -1) {
            outputKey = outputKey.substring(firstSlash + 1);
        }
    } else if (outputKey.startsWith('http://') || outputKey.startsWith('https://')) {
        outputKey = outputKey.replace(/^https?:\/\/[^\/]+\//, '');
    }
    
    // Remove bucket name from key if included
    if (outputKey.startsWith(outputBucket + '/')) {
        outputKey = outputKey.substring(outputBucket.length + 1);
    }
    
    // Sanitize for MinIO compatibility
    outputKey = outputKey
        .replace(/[^a-zA-Z0-9\-._\/!()]/g, '_')
        .replace(/^\/+|\/+$/g, '')
        .substring(0, 1024);
    
    // Fallback if invalid key
    if (!outputKey || outputKey.length < 1) {
        outputKey = `transcoded-${Date.now()}-${fallbackFileName.replace(/[^a-zA-Z0-9\-._]/g, '_')}`;
    }
    
    return outputKey;
}

// Redis-based job storage functions
async function setJob(jobId, jobData) {
    try {
        await redisClient.setEx(JOBS_KEY_PREFIX + jobId, REDIS_TTL_SECONDS, JSON.stringify(jobData));
    } catch (error) {
        console.error('Failed to store job in Redis:', error);
    }
}

async function getJob(jobId) {
    try {
        const data = await redisClient.get(JOBS_KEY_PREFIX + jobId);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to get job from Redis:', error);
        return null;
    }
}

async function setZencoderMapping(zencoderJobId, internalJobId) {
    try {
        await redisClient.setEx(ZENCODER_MAP_PREFIX + zencoderJobId, REDIS_TTL_SECONDS, internalJobId);
    } catch (error) {
        console.error('Failed to store Zencoder mapping in Redis:', error);
    }
}

async function getZencoderMapping(zencoderJobId) {
    try {
        return await redisClient.get(ZENCODER_MAP_PREFIX + zencoderJobId);
    } catch (error) {
        console.error('Failed to get Zencoder mapping from Redis:', error);
        return null;
    }
}

async function getJobCount() {
    try {
        const keys = await redisClient.keys(JOBS_KEY_PREFIX + '*');
        return keys.length;
    } catch (error) {
        console.error('Failed to get job count from Redis:', error);
        return 0;
    }
}

async function getMappingCount() {
    try {
        const keys = await redisClient.keys(ZENCODER_MAP_PREFIX + '*');
        return keys.length;
    } catch (error) {
        console.error('Failed to get mapping count from Redis:', error);
        return 0;
    }
}

// GPU detection - Force to false for CPU encoding
let gpuConfig = {
    nvidia: false
};

function detectGPU() {
    return new Promise((resolve) => {
        console.log('ℹ️  Software encoding mode enabled (Ryzen 9 CPU)');
        gpuConfig.nvidia = false;
        resolve(gpuConfig);
    });
}

// MinIO client - improved configuration for hostname resolution
const minioEndpoint = process.env.MINIO_ENDPOINT || 'http://pageflow_minio:9000';
const endpointUrl = new URL(minioEndpoint);

const minioClient = new Client({
    endPoint: endpointUrl.hostname,
    port: parseInt(endpointUrl.port) || 9000,
    useSSL: endpointUrl.protocol === 'https:',
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin123'
});

console.log(`🗄️  MinIO client configured: ${endpointUrl.hostname}:${endpointUrl.port || 9000}`);

app.use(express.json());

// Health check with CPU status
app.get('/health', async (req, res) => {
    const activeJobs = await getJobCount();
    res.json({ 
        status: 'healthy', 
        service: 'pageflow-transcoder',
        mode: 'CPU (Software Encoding)', // Information hinzugefügt
        activeJobs: activeJobs
    });
});


// Start transcoding job
app.post('/api/jobs', async (req, res) => {
    try {
        const { input, outputs, notifications } = req.body;
        const jobId = uuidv4();
        
        // Initialize job status
        const jobData = {
            id: jobId,
            state: 'processing',
            input: { state: 'processing', url: input },
            outputs: outputs.map((output, index) => ({
                id: uuidv4(),
                state: 'processing',
                url: output.url || `output_${index}.mp4`,
                format: output.format || 'mp4'
            })),
            notifications,
            progress: 0,
            startTime: new Date()
        };
        
        await setJob(jobId, jobData);
        
        // Start transcoding process asynchronously
        processVideo(jobId, input, outputs, notifications).catch(async error => {
            console.error(`Job ${jobId} failed:`, error);
            const job = await getJob(jobId);
            if (job) {
                job.state = 'failed';
                job.input.state = 'failed';
                job.outputs.forEach(output => output.state = 'failed');
                await setJob(jobId, job);
            }
        });
        
        const job = await getJob(jobId);
        res.json({
            id: jobId,
            state: job.state,
            input: job.input,
            outputs: job.outputs
        });
    } catch (error) {
        console.error('Job creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get job status
app.get('/api/jobs/:id', async (req, res) => {
    const job = await getJob(req.params.id);
    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({
        id: job.id,
        state: job.state,
        input: job.input,
        outputs: job.outputs,
        progress: job.progress
    });
});

async function processVideo(jobId, input, outputs, notifications) {
    const tempDir = `/tmp/transcoding/${jobId}`;
    fs.mkdirSync(tempDir, { recursive: true });
    
    try {
        console.log(`🎬 Starting job ${jobId}`);
        await updateJobProgress(jobId, 10, 'downloading');
        
        // Download input file from MinIO
        const inputPath = path.join(tempDir, 'input.mp4');
        
        // Parse input URL to extract bucket and key
        const { bucket: bucketName, key: inputKey } = parseInputUrl(input);
        
        console.log(`📥 Downloading from bucket: ${bucketName}, key: ${inputKey}`);
        
        await minioClient.fGetObject(
            bucketName, 
            inputKey, 
            inputPath
        );
        
        console.log(`📥 Downloaded input: ${inputKey}`);

        // --- NEU: METADATEN DYNAMISCH PER FFPROBE ERMITTELN ---
        const metadata = await new Promise((resolve) => {
            ffmpeg.ffprobe(inputPath, (err, meta) => {
                if (err || !meta || !meta.format) {
                    console.error('❌ ffprobe konnte Metadaten nicht lesen, nutze Fallbacks:', err);
                    resolve({
                        duration_in_ms: 60000,
                        file_size_in_bytes: fs.existsSync(inputPath) ? fs.statSync(inputPath).size : 1000000,
                        width: null,
                        height: null,
                        format: 'mp3'
                    });
                } else {
                    const duration_in_ms = meta.format.duration ? Math.round(parseFloat(meta.format.duration) * 1000) : 60000;
                    const file_size_in_bytes = meta.format.size ? parseInt(meta.format.size) : 1000000;
                    
                    // Prüfen, ob ein Videostream existiert
                    const videoStream = meta.streams ? meta.streams.find(s => s.codec_type === 'video') : null;
                    const width = videoStream ? videoStream.width : null;
                    const height = videoStream ? videoStream.height : null;
                    const format = videoStream ? 'mp4' : 'mp3'; // Pageflow-konforme Erkennung
                    
                    resolve({ duration_in_ms, file_size_in_bytes, width, height, format });
                }
            });
        });

        // Werte im Redis-Job für den späteren API-Abruf speichern
        const currentJob = await getJob(jobId);
        if (currentJob) {
            currentJob.duration_in_ms = metadata.duration_in_ms;
            currentJob.file_size_in_bytes = metadata.file_size_in_bytes;
            currentJob.width = metadata.width;
            currentJob.height = metadata.height;
            currentJob.audio_video_format = metadata.format;
            await setJob(jobId, currentJob);
        }
        // --- ENDE METADATEN-BLOCK ---

        await updateJobProgress(jobId, 20, 'transcoding');
        
        // Process each output format
        const totalOutputs = outputs.length;
        for (let i = 0; i < outputs.length; i++) {
            const output = outputs[i];
            const progressStart = 20 + (i * 60 / totalOutputs);
            const progressEnd = 20 + ((i + 1) * 60 / totalOutputs);
            
            await transcodeVideo(inputPath, output, tempDir, jobId, progressStart, progressEnd);
        }
        
        // Mark job as completed
        await updateJobProgress(jobId, 100, 'finished');
        
        // Send notifications if provided
        if (notifications && notifications.length > 0) {
            await sendNotifications(jobId, notifications);
        }
        
        log(`✅ Job ${jobId} completed successfully`);
        
        // Log final job state
        const finalJob = await getJob(jobId);
        if (finalJob) {
            log(`📊 Job completed: ${finalJob.state}, progress: ${finalJob.progress}%`);
        }
    } catch (error) {
        console.error(`❌ Job ${jobId} failed:`, error);
        await updateJobProgress(jobId, 0, 'failed');
        throw error;
    } finally {
        // Cleanup temp files after a delay
        setTimeout(() => {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }, TEMP_CLEANUP_DELAY_MS);
    }
}

async function updateJobProgress(jobId, progress, state) {
    const job = await getJob(jobId);
    if (job) {
        job.progress = progress;
        if (state === 'finished') {
            job.state = 'finished';
            job.input.state = 'finished';
            job.outputs.forEach(output => output.state = 'finished');
        } else if (state === 'failed') {
            job.state = 'failed';
            job.input.state = 'failed';
            job.outputs.forEach(output => output.state = 'failed');
        }
        await setJob(jobId, job);
    }
}

// Helper function to normalize bitrate values 
function normalizeBitrate(bitrate, defaultValue) {
    if (!bitrate) return defaultValue;
    return bitrate.toString().endsWith('k') ? bitrate : bitrate + 'k';
}

// Helper function to extract numeric bitrate value (removes 'k' suffix)
function extractBitrateValue(bitrate, defaultValue) {
    if (!bitrate) return defaultValue.replace('k', '');
    return bitrate.toString().replace('k', '');
}

function buildFFmpegCommand(inputPath, output) {
    let command = ffmpeg(inputPath);
    const format = (output.format || 'mp4').toLowerCase();
    
    // 1. Reine Audio-Formate abfangen (MP3 / M4A / OGG)
    if (format === 'mp3' || format === 'm4a' || format === 'ogg') {
        command = command.noVideo(); // Verhindert das Hinzufügen von Videospuren
        
        if (format === 'mp3') {
            return command
                .audioCodec('libmp3lame') // Korrekter Codec für MP3
                .audioBitrate(extractBitrateValue(output.audio_bitrate, '192k'));
        } else if (format === 'm4a') {
            return command
                .audioCodec('aac')        // Native AAC für M4A-Container
                .audioBitrate(extractBitrateValue(output.audio_bitrate, '128k'));
        } else if (format === 'ogg') {
            return command
                .audioCodec('libvorbis')  // Der richtige Standard-Codec für OGG-Audio
                .audioBitrate(extractBitrateValue(output.audio_bitrate, '128k'));
        }
    }
    
    // 2. Video-Konfiguration (wird nur ausgeführt, wenn es KEIN Audio-Format ist)
    if (process.env.GPU_ACCELERATION === 'true') {
        command = command
            .inputOptions([
                '-hwaccel', 'vaapi',
                '-hwaccel_device', '/dev/dri/renderD128',
                '-hwaccel_output_format', 'vaapi'
            ])
            .videoFilter('format=nv12,hwupload') 
            .videoCodec('h264_vaapi')
            .outputOptions([
                '-qp', '23', 
                '-b:v', normalizeBitrate(output.video_bitrate, '2000k'),
                '-maxrate', normalizeBitrate(output.video_bitrate, '2000k'),
                '-bufsize', '4000k'
            ]);
    } else {
        command = command
            .videoCodec('libx264')
            .outputOptions([
                '-preset', 'veryfast', 
                '-crf', '23',          
                '-threads', '0',       
                '-b:v', normalizeBitrate(output.video_bitrate, '2000k'),
                '-pix_fmt', 'yuv420p'  
            ]);
    }

    // Audio-Konfiguration für Videodateien
    command = command
        .audioCodec(output.audio_codec || 'aac')
        .audioBitrate(extractBitrateValue(output.audio_bitrate, '128k'));
    
    if (output.size) {
        command = command.size(output.size);
    }
    
    return command;
}

function transcodeVideo(inputPath, output, tempDir, jobId, progressStart, progressEnd) {
    return new Promise((resolve, reject) => {
        const outputFileName = `${path.parse(output.url || 'output.mp4').name}.${output.format || 'mp4'}`;
        const outputPath = path.join(tempDir, outputFileName);
        
        console.log(`🎬 Transcoding: ${outputFileName}`);
        
        const command = buildFFmpegCommand(inputPath, output);
        
        command
            .on('start', (commandLine) => {
                console.log(`📹 FFmpeg command: ${commandLine}`);
            })
            .on('progress', async (progress) => {
                const currentProgress = progressStart + ((progress.percent || 0) * (progressEnd - progressStart) / 100);
                await updateJobProgress(jobId, Math.round(currentProgress), 'transcoding');
                
                // Log progress at intervals
                if (progress.percent && Math.round(progress.percent) % PROGRESS_LOG_INTERVAL === 0) {
                    console.log(`⚡ ${outputFileName}: ${Math.round(progress.percent)}%`);
                }
            })
            .on('end', async () => {
                try {
                    console.log(`✅ Transcoding complete: ${outputFileName}`);
                    
                    // Upload result to MinIO
                    const outputBucket = process.env.MINIO_OUTPUT_BUCKET || 'pageflow-output';
                    const outputKey = parseOutputUrl(output.url, outputBucket, outputFileName);
                    
                    console.log(`📤 Uploading ${outputFileName} to bucket: ${outputBucket}, key: ${outputKey}`);
                    
                    // Dynamischen Content-Type ermitteln
                    let contentType = 'video/mp4';
                    const currentFormat = (output.format || 'mp4').toLowerCase();

                    if (currentFormat === 'webm') contentType = 'video/webm';
                    else if (currentFormat === 'mp3') contentType = 'audio/mpeg';
                    else if (currentFormat === 'm4a') contentType = 'audio/mp4';
                    else if (currentFormat === 'ogg') contentType = 'audio/ogg'; // <-- NEU HINZUGEFÜGT

                    console.log(`📤 Uploading ${outputFileName} to bucket: ${outputBucket}, key: ${outputKey}`);

                    await minioClient.fPutObject(
                        outputBucket,
                        outputKey,
                        outputPath,
                        {
                            'Content-Type': contentType
                        }
                    );
                    
                    console.log(`📤 Uploaded successfully: ${outputKey}`);
                    
                    // Update the job output with the actual MinIO object key for the API response
                    const job = await getJob(jobId);
                    if (job) {
                        const matchingOutput = job.outputs.find(o => o.label === output.label);
                        if (matchingOutput) {
                            matchingOutput.actualMinioKey = outputKey; // Store the actual MinIO object key
                        }
                        await setJob(jobId, job);
                    }
                    
                    resolve();
                } catch (error) {
                    console.error(`❌ Upload failed for ${outputFileName}:`, error);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.error(`❌ Transcoding failed for ${outputFileName}:`, error);
                reject(error);
            })
            .save(outputPath);
    });
}

async function sendNotifications(jobId, notifications) {
    const job = await getJob(jobId);
    if (!job) return;
    
    notifications.forEach(notification => {
        if (notification.url) {
            const notificationData = JSON.stringify({
                job: {
                    id: job.id,
                    state: job.state,
                    progress: job.progress
                },
                input: job.input,
                outputs: job.outputs
            });
            
            const parsedUrl = url.parse(notification.url);
            const client = parsedUrl.protocol === 'https:' ? https : http;
            
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.path,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(notificationData)
                }
            };
            
            const req = client.request(options, (res) => {
                console.log(`📡 Notification sent: ${res.statusCode}`);
            });
            
            req.on('error', (error) => {
                console.error('❌ Notification failed:', error);
            });
            
            req.write(notificationData);
            req.end();
        }
    });
}

// ZENCODER API COMPATIBILITY ENDPOINTS
// These endpoints provide Zencoder API compatibility for Pageflow

// Map Zencoder outputs to our transcoder format
function convertZencoderOutputs(zencoderOutputs, inputUrl) {
    const outputs = [];
    
    for (const output of zencoderOutputs) {
        // Convert Zencoder output format to our transcoder format
        const convertedOutput = {
            url: output.url,
            format: output.format || 'mp4',
            video_bitrate: output.video_bitrate ? (output.video_bitrate.toString().endsWith('k') ? output.video_bitrate : `${output.video_bitrate}k`) : '2000k',
            audio_bitrate: output.audio_bitrate ? (output.audio_bitrate.toString().endsWith('k') ? output.audio_bitrate : `${output.audio_bitrate}k`) : '128k',
            size: output.size || '1280x720'
        };
        
        // Handle special Zencoder properties
        if (output.video_codec) {
            convertedOutput.video_codec = output.video_codec;
        }
        if (output.audio_codec) {
            convertedOutput.audio_codec = output.audio_codec;
        }
        if (output.label) {
            convertedOutput.label = output.label;
        }
        
        outputs.push(convertedOutput);
    }
    
    return outputs;
}

// Zencoder API: Create Job
app.post('/v1/jobs', async (req, res) => {
    try {
        const { input, outputs, notifications } = req.body;
        
        log(`📥 Zencoder job: ${input} → ${outputs?.length || 0} outputs, ${notifications?.length || 0} notifications`);
        
        // Convert Zencoder format to our transcoder format
        const convertedOutputs = convertZencoderOutputs(outputs || [], input);
        
        // Create job using our existing processVideo function
        const jobId = uuidv4();
        
        // Initialize job status (reuse existing job structure)
        const jobData = {
            id: jobId,
            state: 'processing',
            input: { state: 'processing', url: input },
            outputs: convertedOutputs.map((output, index) => ({
                id: uuidv4(),
                state: 'processing',
                url: output.url,
                format: output.format || 'mp4',
                label: output.label || `output_${index}`
            })),
            notifications: notifications || [],
            progress: 0,
            startTime: new Date(),
            zencoderMode: true  // Flag to identify Zencoder API jobs
        };
        
        await setJob(jobId, jobData);
        
        // Start transcoding process asynchronously
        processVideo(jobId, input, convertedOutputs, notifications).catch(async error => {
            console.error(`Job ${jobId} failed:`, error);
            const job = await getJob(jobId);
            if (job) {
                job.state = 'failed';
                job.input.state = 'failed';
                job.outputs.forEach(output => output.state = 'failed');
                await setJob(jobId, job);
            }
        });
        
        // Return Zencoder-compatible response
        const job = await getJob(jobId);
        // Generate smaller job ID that fits in 4-byte signed integer (max 2147483647)
        const zencoderJobId = Math.floor(Math.random() * 2000000000) + 100000000;
        
        // Store the mapping for later lookups
        await setZencoderMapping(zencoderJobId, jobId);
        
        log(`✅ Created Zencoder job ${zencoderJobId} (internal: ${jobId})`);
        
        res.json({
            id: zencoderJobId,
            outputs: job.outputs.map(output => ({
                id: Math.floor(Math.random() * 2000000000) + 100000000,
                url: output.url,
                label: output.label
            }))
        });
        
    } catch (error) {
        console.error('❌ Zencoder job creation failed:', error.message);
        res.status(500).json({
            errors: [`Failed to create transcoding job: ${error.message}`]
        });
    }
});

// Zencoder API: Get Job Progress
app.get('/v1/jobs/:id/progress', async (req, res) => {
    try {
        const zencoderJobId = parseInt(req.params.id);
        
        // Find job by Zencoder ID using the mapping
        const internalJobId = await getZencoderMapping(zencoderJobId);
        const job = internalJobId ? await getJob(internalJobId) : null;
        
        if (!job) {
            log(`❌ Zencoder job ${zencoderJobId} not found (progress request)`);
            return res.status(404).json({
                errors: ['Job not found']
            });
        }
        
        // Convert our state to Zencoder state
        let zencoderState = 'processing';
        if (job.state === 'finished') {
            zencoderState = 'finished';
        } else if (job.state === 'failed') {
            zencoderState = 'failed';
        }
        
        log(`📊 Zencoder job ${zencoderJobId} progress: ${job.progress}% (${zencoderState})`);
        
        res.json({
            state: zencoderState,
            progress: job.progress
        });
        
    } catch (error) {
        console.error('❌ Failed to get Zencoder job progress:', error.message);
        res.status(500).json({
            errors: [`Failed to get job progress: ${error.message}`]
        });
    }
});

// Zencoder API: Get Job Details
// Zencoder API: Get Job Details
app.get('/v1/jobs/:id', async (req, res) => {
    try {
        const zencoderJobId = parseInt(req.params.id);
        
        // Find job by Zencoder ID using the mapping
        const internalJobId = await getZencoderMapping(zencoderJobId);
        const job = internalJobId ? await getJob(internalJobId) : null;
        
        if (!job) {
            log(`❌ Zencoder job ${zencoderJobId} not found (details request)`);
            return res.status(404).json({
                errors: ['Job not found']
            });
        }
        
        log(`📋 Zencoder job ${zencoderJobId} details requested`);
        
        // Return Zencoder-compatible job details
        res.json({
            job: {
                id: zencoderJobId,
                state: job.state,
                input_media_file: {
                    format: job.audio_video_format || 'mp4',
                    duration_in_ms: job.duration_in_ms || 60000,
                    width: job.width || null,  // null signalisiert Pageflow "Reines Audio"
                    height: job.height || null,
                    file_size_in_bytes: job.file_size_in_bytes || 1000000
                },
                output_media_files: job.outputs.map(output => {
                    const outputBucket = process.env.MINIO_OUTPUT_BUCKET || 'pageflow-output';
                    const externalEndpoint = process.env.S3_HOST_EXTERNAL || process.env.S3_ENDPOINT_EXTERNAL || 'http://localhost:9002';
                    
                    let outputKey = output.actualMinioKey;
                    
                    if (!outputKey) {
                        outputKey = (output.url || '').replace(/^https?:\/\/[^\/]+\//, '');
                        outputKey = outputKey.replace(/^s3:\/\/[^\/]+\//, '');
                    }
                    
                    const accessibleUrl = `${externalEndpoint}/${outputBucket}/${outputKey}`;
                    
                    return {
                        id: Math.floor(Math.random() * 2000000000) + 100000000,
                        state: output.state,
                        label: output.label,
                        url: accessibleUrl,
                        format: output.format,
                        duration_in_ms: job.duration_in_ms || 60000,
                        file_size_in_bytes: job.file_size_in_bytes ? Math.round(job.file_size_in_bytes * 0.9) : 1000000,
                        width: job.width || null,
                        height: job.height || null
                    };
                })
            }
        });
        
    } catch (error) {
        console.error('❌ Failed to get Zencoder job details:', error.message);
        res.status(500).json({
            errors: [`Failed to get job details: ${error.message}`]
        });
    }
});

// Legacy Zencoder API endpoints (without /v1/ prefix)
app.post('/jobs', (req, res) => {
    req.url = '/v1/jobs';
    app.handle(req, res);
});

app.get('/jobs/:id/progress', (req, res) => {
    req.url = `/v1/jobs/${req.params.id}/progress`;
    app.handle(req, res);
});

app.get('/jobs/:id', (req, res) => {
    req.url = `/v1/jobs/${req.params.id}`;
    app.handle(req, res);
});

// Initialize detection and start server
detectGPU().then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        // Text angepasst: "CPU-based" statt "GPU-accelerated"
        log(`🚀 Transcoder (CPU-based) running on port ${PORT}`);
        console.log(`💻 Mode: Software Encoding (Ryzen 9 Optimization)`);
        console.log(`📊 Max concurrent jobs: ${process.env.MAX_CONCURRENT_JOBS || 6}`);
        console.log(`🔄 Zencoder API compatibility enabled at /v1/jobs`);
    });
});
// Periodic cleanup stats logging - Redis handles TTL automatically
setInterval(async () => {
    try {
        const jobCount = await getJobCount();
        const mappingCount = await getMappingCount();
        if (jobCount > 0 || mappingCount > 0) {
            log(`📊 Active jobs: ${jobCount}, mappings: ${mappingCount}`);
        }
    } catch (error) {
        console.error('Failed to get Redis storage stats:', error);
    }
}, CLEANUP_INTERVAL_MS);
