# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ability do
  describe 'admin user' do
    it 'can manage everything' do
      user = User.new(
        role: 'admin'
      )

      ability = Ability.new(user)

      expect(ability.can?(:manage, :all)).to be true
    end
  end

  describe 'registered user' do
    let(:user) do
      User.new(
        id: 1,
        role: 'registered'
      )
    end

    let(:other_user) do
      User.new(
        id: 2,
        role: 'registered'
      )
    end

    it 'can read blogs' do
      ability = Ability.new(user)

      expect(ability.can?(:read, Blog)).to be true
    end

    it 'can create blogs' do
      ability = Ability.new(user)

      expect(ability.can?(:create, Blog)).to be true
    end

    it 'can update their own blog' do
      blog = Blog.new(user_id: user.id)

      ability = Ability.new(user)

      expect(ability.can?(:update, blog)).to be true
    end

    it 'cannot update another users blog' do
      blog = Blog.new(user_id: other_user.id)

      ability = Ability.new(user)

      expect(ability.can?(:update, blog)).to be false
    end

    it 'can destroy their own blog' do
      blog = Blog.new(user_id: user.id)

      ability = Ability.new(user)

      expect(ability.can?(:destroy, blog)).to be true
    end

    it 'cannot destroy another users blog' do
      blog = Blog.new(user_id: other_user.id)

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
