# frozen_string_literal: true

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
    subdomain = request.subdomain

    organization = Organization.find_by(subdomain: subdomain)

    if organization
      ActsAsTenant.current_tenant = organization
    else
      render json: { error: 'Organization not found' }, status: :not_found
    end
  end
end
