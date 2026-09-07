# frozen_string_literal: true

# multi tenancy via organization subdomain and organization_id
class OrganizationsController < ApplicationController
  respond_to :json

  def index
    organizations = Organization.select(:id, :name).order(:name)

    render json: organizations
  end
end
