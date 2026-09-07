# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Admin Reports', type: :request do
  let!(:organization) do
    Organization.create!(
      name: 'Test Organization',
      subdomain: 'test'
    )
  end

  let!(:admin) do
    ActsAsTenant.with_tenant(organization) do
      User.create!(
        username: 'admin',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin'
      )
    end
  end

  before do
    ActsAsTenant.current_tenant = organization
  end

  # describe 'GET /admin/reports' do
  #   it 'allows an admin to access the report' do
  #   end

  #   it 'returns forbidden for a non-admin user' do
  #   end
  # end
end
