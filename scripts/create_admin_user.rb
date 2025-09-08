#!/usr/bin/env ruby
# frozen_string_literal: true

# Admin user creation script for Pageflow
# This script creates the required Site, Account, and Admin User with proper relationships

require 'pageflow'

# Get parameters from environment variables
admin_email = ENV['ADMIN_EMAIL']
admin_password = ENV['ADMIN_PASSWORD']
admin_first_name = ENV['ADMIN_FIRST_NAME']
admin_last_name = ENV['ADMIN_LAST_NAME']

if [admin_email, admin_password, admin_first_name, admin_last_name].any?(&:nil?)
  puts '❌ Missing required environment variables'
  exit 1
end

begin
  # Create account and site together using Pageflow's intended pattern
  account_name = "#{admin_first_name} #{admin_last_name}"
  puts "🏢 Creating account and site for: #{account_name}"
  
  account = Pageflow::Account.find_by(name: account_name)
  
  if account.nil?
    puts '🏗️  Creating new account with default site...'
    account = Pageflow::Account.new(
      name: account_name,
      default_file_rights: 'public'
    )
    
    # Use Pageflow's build_default_site method to handle circular dependency
    site = account.build_default_site(
      name: "#{account_name} Site",
      cname: 'localhost',
      title: 'Self-Hosted Pageflow',
      imprint_link_label: 'About',
      imprint_link_url: '/',
      copyright_link_label: 'Copyright',
      copyright_link_url: '/',
      privacy_link_url: '/'
    )
    
    unless account.save
      puts '❌ Failed to create account:'
      puts account.errors.full_messages.join(', ')
      puts "Site errors: #{site.errors.full_messages.join(', ')}" if site.errors.any?
      exit 1
    end
    
    puts "✅ Account created: ID=#{account.id}, Name='#{account.name}'"
    puts "✅ Site created: ID=#{site.id}, Name='#{site.name}'"
  else
    puts "✅ Using existing account: ID=#{account.id}, Name='#{account.name}'"
  end

  # Create admin user
  puts '👤 Creating admin user...'
  user = User.find_or_initialize_by(email: admin_email)
  user.assign_attributes(
    password: admin_password,
    password_confirmation: admin_password,
    first_name: admin_first_name,
    last_name: admin_last_name,
    admin: true
  )

  if user.save
    puts "✅ User created: ID=#{user.id}, Email=#{user.email}"
    
    # Create membership if needed
    unless account.users.include?(user)
      puts '🔗 Creating membership...'
      membership = Pageflow::Membership.create!(
        user: user,
        entity: account,
        role: 'manager'
      )
      puts "✅ Membership created: ID=#{membership.id}, entity_id=#{membership.entity_id}"
    else
      puts '✅ User already has membership'
    end
    
    puts '✅ Admin user created successfully!'
    puts "Email: #{admin_email}"
  else
    puts '❌ Failed to create admin user:'
    puts user.errors.full_messages.join(', ')
    exit 1
  end

rescue => e
  puts '❌ Error creating admin user:'
  puts e.message
  puts e.backtrace.first(5) if ENV['DEBUG']
  exit 1
end