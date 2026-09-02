# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    # before_action :configure_sign_in_params, only: [:create]
    respond_to :json
    # GET /resource/sign_in
    # def new
    #   super
    # end

    # POST /resource/sign_in
    def create
      super do |temp|
        render json: { user: temp, message: 'Login successful!' }, status: :ok and return
      end
    end

    # DELETE /resource/sign_out

    # protected

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_sign_in_params
    #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
    # end
    private

    def respond_to_on_destroy
      render json: {
        message: 'Logout successful!'
      }, status: :ok
    end
  end
end
