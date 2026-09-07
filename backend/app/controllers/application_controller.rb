# frozen_string_literal: true

# controller for all the controllers in the application
class ApplicationController < ActionController::API
  set_current_tenant_through_filter
  before_action :devise_params, if: :devise_controller?
  before_action :set_current_tenant
  rescue_from CanCan::AccessDenied do |err|
    render json: { error: err.message }, status: :forbidden
  end

  protected

  def devise_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end

  private

  def set_current_tenant
    if request.subdomain == 'www'
      ActsAsTenant.current_tenant = nil
      return
    end

    organization = Organization.find_by(subdomain: request.subdomain)

    raise ActiveRecord::RecordNotFound, 'Organization not found' unless organization

    ActsAsTenant.current_tenant = organization
  end
end
