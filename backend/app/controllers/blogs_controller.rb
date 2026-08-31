# frozen_string_literal: true

# app/controllers/blogs_controller.rb
class BlogsController < ApplicationController
  respond_to :json
  load_and_authorize_resource

  def index
    blogs = Blog.includes(:user, :category)

    if params[:search].present?
      blogs = @blogs.where('title LIKE :query OR content LIKE :query', query: "%#{params[:search].strip}%")
    end

    page = params[:page].to_s
    page = 1 if page.blank? || page == 'NaN' || page.to_i <= 0

    blogs = blogs.paginate(page: page, per_page: 10)

    render json: {
      blogs: blogs,
      pagination: {
        current_page: blogs.current_page,
        total_pages: blogs.total_pages,
        total_entries: blogs.total_entries
      }
    }
  end

  def show
    # render json: @blog.as_json(include: [:comments, :category, :user])
    render json: { blog: @blog.as_json(include: { comments: { only: %i[id content user_id] }, contributors: {
                                         only: %i[id username]
                                       }, category: { only: %i[id name] },
                                                  user: { only: %i[id username] } })
                              .merge(image_url: @blog.image.attached? ? url_for(@blog.image) : nil) }
  end

  def create
    @blog.user = current_user

    if @blog.save
      render json: { blog: @blog, message: 'blog created' }, status: :created
    else
      render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    # byebug
    if @blog.update(blog_params)
      render json: { blog: @blog, message: 'blog update successful' }
    else
      render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    # byebug
    @blog.destroy
    render json: { message: 'blog delete  successful!' }, status: :ok and return
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :content, :category_id, :image)
  end
end
