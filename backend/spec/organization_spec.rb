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
    it 'has many users, destroyed with organization' do
      association = described_class.reflect_on_association(:users)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many blogs, destroyed with organization' do
      association = described_class.reflect_on_association(:blogs)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many categories, destroyed with organization' do
      association = described_class.reflect_on_association(:categories)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many comments, destroyed with organization' do
      association = described_class.reflect_on_association(:comments)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many blog_contributors, destroyed with organization' do
      association = described_class.reflect_on_association(:blog_contributors)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many blog_edit_requests, destroyed with organization' do
      association = described_class.reflect_on_association(:blog_edit_requests)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end
  end
end
