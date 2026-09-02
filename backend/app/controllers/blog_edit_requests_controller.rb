# frozen_string_literal: true

class BlogEditRequestsController < ApplicationController
  respond_to :json

  before_action :set_blog
  before_action :set_edit_request, only: %i[approve reject]
  def index
    blog = Blog.find(params[:blog_id])

    authorize! :read, blog

    edit_requests = blog.blog_edit_requests
                        .where(status: 'pending')
                        .includes(:contributor, :category)

    render json: {
      edit_requests: edit_requests.as_json(
        include: { contributor: { only: %i[id username] },
                   category: { only: %i[id name] } }
      )
    }
  end

  def show; end

  def create
    authorize! :create, BlogEditRequest

    unless @blog.contributors.exists?(current_user.id)
      return render json: { error: 'You are not a contributor of this blog' }, status: :forbidden
    end

    edit_request = @blog.blog_edit_requests.create(
      contributor_id: current_user.id,
      title: params[:blog][:title],
      content: params[:blog][:content],
      category_id: params[:blog][:category_id],
      status: 'pending'
    )

    if edit_request.persisted?
      render json: { edit_request: edit_request, message: 'Edit request submitted for approval' }, status: :created
    else
      render json: { errors: edit_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def approve
    authorize! :manage, @edit_request

    Blog.transaction do
      @blog.update!(
        title: @edit_request.title,
        content: @edit_request.content,
        category_id: @edit_request.category_id
      )

      @edit_request.update!(status: 'approved')
    end

    render json: { message: 'Edit request approved successfully', blog: @blog }, status: :ok
  end

  def reject
    authorize! :manage, @edit_request

    @edit_request.update!(status: 'rejected')

    render json: { message: 'Edit request rejected' }, status: :ok
  end

  private

  def set_blog
    @blog = Blog.find(params[:blog_id])
  end

  def set_edit_request
    @edit_request = @blog.blog_edit_requests.find(params[:id])
  end
end
