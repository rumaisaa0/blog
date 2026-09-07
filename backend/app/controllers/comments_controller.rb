# frozen_string_literal: true

# comment add show action controllers
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
    render json: @comment
  end

  def create
    @comment = build_comment

    if @comment.save
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    render json: { message: 'comment deleted  successful!' }, status: :ok and return
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def build_comment
    if params[:blog_id]
      blog_comment
    elsif params[:category_id]
      category_comment
    end
  end

  def blog_comment
    Blog.find(params[:blog_id]).comments
        .build(comment_params.merge(user: current_user))
  end

  def category_comment
    Category.find(params[:category_id]).comments
            .build(comment_params.merge(user: current_user))
  end
end
