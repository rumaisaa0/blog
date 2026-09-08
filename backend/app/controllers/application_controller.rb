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
    return if ['/organizations', '/users'].include?(request.path)

    subdomain = request.subdomain.presence

    if subdomain.present? && subdomain != 'www'
      organization = Organization.find_by(subdomain: subdomain)
      ActsAsTenant.current_tenant = organization
      return
    end

    # Do not force the default tenant on login / localhost requests. Without a real
    # tenant subdomain, we should leave the tenant unset so login can validate across
    # organizations and the frontend can redirect to the correct org URL afterwards.
    ActsAsTenant.current_tenant = nil
  end
end
