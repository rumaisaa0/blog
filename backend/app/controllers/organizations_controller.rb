# frozen_string_literal: true

class OrganizationsController < ApplicationController
  respond_to :json

  def index
    organizations = Organization.select(:id, :name).order(:name)

    render json: organizations
  end
end
