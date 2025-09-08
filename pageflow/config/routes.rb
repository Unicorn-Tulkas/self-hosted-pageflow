require 'resque/server'
require 'resque/scheduler/server'

Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  
  # ActiveAdmin routes
  ActiveAdmin.routes(self)
  
  # Resque admin interface (requires admin authentication)
  authenticate :user, lambda { |user| user.admin? } do
    mount Resque::Server.new, at: "/background_jobs"
  end
  
  # Pageflow routes (must be last)
  Pageflow.routes(self)
end