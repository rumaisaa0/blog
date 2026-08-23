# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  respond_to :json
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
     super do |temp|
       render json: { user: temp, message: 'login successful'} , status: :ok and return
     end
  end

  # DELETE /resource/sign_out
  def destroy
     super do
       render json: { message: 'logout successful'}, status: :ok and return
     end
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
  private

  def respond_to_on_destroy
    if current_user
      head :ok
    else
      head :unauthorized
    end
  end
end
