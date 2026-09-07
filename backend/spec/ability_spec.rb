# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ability do
  let(:organization) { Organization.create!(name: 'Test Org', subdomain: 'test-org') }
  let(:category) { Category.create!(name: 'Tech', organization: organization) }

  def create_user(role:, organization:, suffix:)
    User.create!(
      email: "user#{suffix}@example.com",
      username: "user#{suffix}",
      password: 'password123',
      role: role,
      organization: organization,
      confirmed_at: Time.current
    )
  end

  describe 'registered user' do
    let(:user) { create_user(role: 'registered', organization: organization, suffix: 2) }
    let(:other_user) { create_user(role: 'registered', organization: organization, suffix: 3) }

    it 'can read blogs' do
      ability = Ability.new(user)

      expect(ability.can?(:read, Blog)).to be true
    end

    it 'can create blogs' do
      ability = Ability.new(user)

      expect(ability.can?(:create, Blog)).to be true
    end

    it 'can update their own blog' do
      blog = Blog.new(user: user, organization: organization, category: category)

      ability = Ability.new(user)

      expect(ability.can?(:update, blog)).to be true
    end

    it 'cannot update another users blog' do
      blog = Blog.new(user: other_user, organization: organization, category: category)

      ability = Ability.new(user)

      expect(ability.can?(:update, blog)).to be false
    end

    it 'can destroy their own blog' do
      blog = Blog.new(user: user, organization: organization, category: category)

      ability = Ability.new(user)

      expect(ability.can?(:destroy, blog)).to be true
    end

    it 'cannot destroy another users blog' do
      blog = Blog.new(user: other_user, organization: organization, category: category)

      ability = Ability.new(user)

      expect(ability.can?(:destroy, blog)).to be false
    end
  end

  describe 'guest user' do
    it 'can read blogs' do
      ability = Ability.new(nil)

      expect(ability.can?(:read, Blog)).to be true
    end

    it 'can read categories' do
      ability = Ability.new(nil)

      expect(ability.can?(:read, Category)).to be true
    end

    it 'cannot create blogs' do
      ability = Ability.new(nil)

      expect(ability.can?(:create, Blog)).to be false
    end
  end
end
