# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Organization, type: :model do
  describe 'validations' do
    it 'is valid with a name and subdomain' do
      organization = Organization.new(
        name: 'Test Organization',
        subdomain: 'test'
      )

      expect(organization).to be_valid
    end

    it 'is invalid without a name' do
      organization = Organization.new(subdomain: 'test')

      expect(organization).not_to be_valid
    end

    it 'is invalid without a subdomain' do
      organization = Organization.new(name: 'Test Organization')

      expect(organization).not_to be_valid
    end

    it 'does not allow duplicate subdomains' do
      Organization.create!(
        name: 'Organization 1',
        subdomain: 'test'
      )

      organization = Organization.new(
        name: 'Organization 2',
        subdomain: 'test'
      )

      expect(organization).not_to be_valid
    end
  end

  describe 'associations' do
    it { is_expected.to have_many(:users).dependent(:destroy) }
    it { is_expected.to have_many(:blogs).dependent(:destroy) }
    it { is_expected.to have_many(:categories).dependent(:destroy) }
    it { is_expected.to have_many(:comments).dependent(:destroy) }
    it { is_expected.to have_many(:blog_contributors).dependent(:destroy) }
    it { is_expected.to have_many(:blog_edit_requests).dependent(:destroy) }
  end
end
