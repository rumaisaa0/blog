class CommentsController < ApplicationController
  load_and_authorize_resource
  def index
   if params[:blog_id]
      @blog = Blog.find(params[:blog_id])
      @comments = @blog.comments
   elsif params[:category_id]
      @category = Category.find(params[:category_id])
      @comments = @category.comments
   end

   render json: @comments
  end

  def show
  end

  def create
    if params[:blog_id]
    blog = Blog.find(params[:blog_id])
    @comment = blog.comments.create(comment_params.merge(user: current_user))

    if @comment.save
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
    elsif params[:category_id]
      category = Category.find(params[:category_id])
      @comment = category.comments.create(comment_params.merge(user: current_user))

      if @comment.save
       render json: @comment, status: :created
      else
       render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
      end
    end 
  end

  def update
  end

  def destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end
end