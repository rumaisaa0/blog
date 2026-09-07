# frozen_string_literal: true

# app/controllers/blogs_controller.rb
class BlogsController < ApplicationController
  respond_to :json
  load_and_authorize_resource

  def index
    page = params[:page].to_i
    page = 1 if page <= 0
    per_page = 10
    organization_id = ActsAsTenant.current_tenant&.id
    if params[:search].present?
      search_results = Blog.search(params[:search].strip,
        organization_id: organization_id, page: page, per_page: per_page )

      blogs = search_results.records.includes(:user, :category)

      total_entries = search_results.results.total
    else
      blogs = Blog.includes(:user, :category)

      blogs = blogs.unscoped if organization_id.nil?

      total_entries = blogs.count
      blogs = blogs.paginate(page: page, per_page: per_page)
    end
    total_pages = (total_entries.to_f / per_page).ceil

    render json: {
      blogs: blogs.as_json(
      include: {
        user: {
          only: %i[id username]
        },
        category: {
          only: %i[id name]
        }
      }
    ),
      pagination: {
        current_page: page,
        total_pages: total_pages,
        total_entries: total_entries
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
