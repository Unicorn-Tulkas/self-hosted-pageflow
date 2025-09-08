class ApplicationController < ActionController::Base
  # CSRF protection
  protect_from_forgery with: :exception, unless: :health_check_request?
  
  # Skip CSRF for health checks
  skip_before_action :verify_authenticity_token, if: :health_check_request?
  
  # Devise authentication
  before_action :authenticate_user!, except: [:health_check]
  
  protected
  
  # Check if this is a health check request
  def health_check_request?
    request.path.in?(['/health', '/ping', '/status']) ||
    request.path.start_with?('/rails/health')
  end
  
  # Check if current user is admin
  def ensure_admin!
    unless current_user&.admin?
      redirect_to root_path, alert: 'Access denied.'
    end
  end

end
