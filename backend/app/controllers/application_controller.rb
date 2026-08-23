class ApplicationController < ActionController::API
  before_action :configure_permitted_params, if: :devise_controller?
  rescue_from CanCan::AccessDenied do |err|
    render json: { error: err.message }, status: :forbidden
  end

  protected
  def configure_permitted_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :role])
  end
end
