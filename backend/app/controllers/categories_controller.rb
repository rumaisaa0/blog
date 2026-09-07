# frozen_string_literal: true

class CategoriesController < ApplicationController
  respond_to :json
  load_and_authorize_resource
  def index
    render json: @categories
  end

  def show
    render json: @category
  end

  def create
    if @category.save
      render json: { category: @category, message: 'Category created successfully' }, status: :created
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @category.update(category_params)
      render json: { category: @category, message: 'Category updated successfully' }, status: :ok
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @category.destroy
      render json: { message: 'Category deleted successfully' }, status: :ok
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
