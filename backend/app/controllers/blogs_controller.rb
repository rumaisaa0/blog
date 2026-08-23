# app/controllers/blogs_controller.rb
class BlogsController < ApplicationController
  respond_to :json
  load_and_authorize_resource

  def index
    blogs = Blog.includes(:user, :category)

    if params[:search].present?
      blogs = blogs.where("title LIKE :q OR content LIKE :q", q: "%#{params[:search]}%")
    end

    blogs = blogs.paginate(page: params[:page], per_page: 10)

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
    render json: @blog.as_json(include: [:comments, :category, :user])
  end

  def create
    @blog.user = current_user

    if @blog.save
      render json: @blog, status: :created
    else
      render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @blog.update(blog_params)
      render json: @blog
    else
      render json: { errors: @blog.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @blog.destroy
    head :no_content
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :content, :category_id)
  end
end