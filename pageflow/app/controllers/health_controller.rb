class HealthController < ActionController::Base
  # Skip all filters for health checks
  skip_before_action :verify_authenticity_token
  skip_before_action :authenticate_user!, raise: false
  
  def show
    render json: { 
      status: 'ok', 
      timestamp: Time.current.iso8601,
      version: Rails.version
    }
  end
  
  def ping
    render plain: 'pong'
  end
end