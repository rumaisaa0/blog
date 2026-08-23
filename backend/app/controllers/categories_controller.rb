class CategoriesController < ApplicationController
  respond_to :json
  load_and_authorize_resource
  def index
    render json: @categories
  end

  def show
    render json: @category
  end

end
