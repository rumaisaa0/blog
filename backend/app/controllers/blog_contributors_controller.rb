# frozen_string_literal: true

# blog_contributors_controller.rb
class BlogContributorsController < ApplicationController
  respond_to :json
  before_action :set_blog
  before_action :authorize_blog_contributor
  def index
    render json: @blog.contributors
  end

  def create
    contributor = @blog.blog_contributors.new(user_id: params[:user_id])
    if contributor.save
      render json: { contributor: contributor.user, message: 'Contributor added successfully' }, status: :created
    else
      render json: { errors: contributor.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    contributor = @blog.blog_contributors.find_by!(user_id: params[:id])

    contributor.destroy

    render json: { message: 'Contributor removed successfully' }, status: :ok
  end

  private

  def set_blog
    @blog = Blog.find(params[:blog_id])
  end

  def authorize_blog_contributor
    authorize! :manage, BlogContributor.new(blog: @blog)
  end
end
