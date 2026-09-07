# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Blog, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      blog = Blog.new(
        title: 'My Blog',
        content: 'Some blog content'
      )

      expect(blog).to be_valid
    end

    it 'is invalid without a title' do
      blog = Blog.new(content: 'Some content')

      expect(blog).not_to be_valid
    end

    it 'is invalid without content' do
      blog = Blog.new(title: 'My Blog')

      expect(blog).not_to be_valid
    end

    it 'does not allow a title longer than 255 characters' do
      blog = Blog.new(
        title: 'a' * 256,
        content: 'Some content'
      )

      expect(blog).not_to be_valid
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      association = Blog.reflect_on_association(:user)

      expect(association.macro).to eq(:belongs_to)
    end

    it 'belongs to a category' do
      association = Blog.reflect_on_association(:category)

      expect(association.macro).to eq(:belongs_to)
    end

    it 'has many blog contributors' do
      association = Blog.reflect_on_association(:blog_contributors)

      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many contributors through blog contributors' do
      association = Blog.reflect_on_association(:contributors)

      expect(association.macro).to eq(:has_many)
      expect(association.options[:through]).to eq(:blog_contributors)
    end

    it 'has many blog edit requests' do
      association = Blog.reflect_on_association(:blog_edit_requests)

      expect(association.macro).to eq(:has_many)
      expect(association.options[:dependent]).to eq(:destroy)
    end

    it 'has many comments' do
      association = Blog.reflect_on_association(:comments)

      expect(association.macro).to eq(:has_many)
    end

    it 'has an attached image' do
      expect(Blog.new).to respond_to(:image)
    end
  end
end
