class UsersController < ApplicationController
  before_action :authenticate_user!

  load_and_authorize_resource only: [:index, :show, :update, :destroy]

  def view_profile
    authorize! :read, current_user

    render json: { user: current_user }, status: :ok
  end

  def index
    render json: @users
  end

  def show
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:username, :email)
  end
end