# frozen_string_literal: true
require 'securerandom'
module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json
    before_action :configure_sign_up_params, only: [:create]
    # before_action :configure_account_update_params, only: [:update]

    # GET /resource/sign_up
    # def new
    #   super
    # end

    # POST /resource
    def create 
      
      resource = build_resource(sign_up_params) 
      organization = find_or_create_organization
      if organization.nil? 
        return render json: { errors: ['Please select or create an organization'] }, status: :unprocessable_entity 
      end 
      resource.organization = organization 
      if resource.save 
        render json: { user: resource, message: 'Registration successful. Please check your email to confirm your account.', organization: { id: organization.id, name: organization.name, subdomain: organization.subdomain } }, status: :created 
      else 
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity 
      end 
    end
    # GET /resource/edit
    # def edit
    #   super
    # end

    # PUT /resource
    def update
      super do |temp|
        render json: { user: temp, message: 'update successful' }, status: :ok and return
      end
    end

    # DELETE /resource

    # GET /resource/cancel
    # Forces the session data which is usually expired after sign
    # in to be expired now. This is useful if the user wants to
    # cancel oauth signing in/up in the middle of the process,
    # removing all OAuth session data.
    # def cancel
    #   super
    # end

    # protected

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_sign_up_params
    #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
    # end

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_account_update_params
    #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
    # end

    # The path used after sign up.
    # def after_sign_up_path_for(resource)
    #   super(resource)
    # end

    # The path used after sign up for inactive accounts.
    # def after_inactive_sign_up_path_for(resource)
    #   super(resource)
    # end
  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[username email password password_confirmation organization_id]
    )
  end

  private

  def find_or_create_organization
    organization_id = params.dig(:user, :organization_id)
    organization_name = params.dig(:user, :organization, :name)

    if organization_id.present?
      Organization.find_by(id: organization_id)
    elsif organization_name.present?
      name = organization_name.strip
      subdomain = name.parameterize
      while Organization.exists?(subdomain: subdomain)
        subdomain = "#{name.parameterize}-#{SecureRandom.hex(2)}"
      end
      Organization.create(name: name, subdomain: subdomain)
    end
  end
  end
end
