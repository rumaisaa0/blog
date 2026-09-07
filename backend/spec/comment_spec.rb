# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'associations' do
    it 'belongs to user' do
      association = described_class.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'belongs to commentable' do
      association = described_class.reflect_on_association(:commentable)
      expect(association.macro).to eq(:belongs_to)
    end
  end

  describe 'validations' do
    it 'allows Blog as commentable type' do
      comment = Comment.new(commentable_type: 'Blog')

      expect(comment.errors[:commentable_type]).to be_empty
    end

    it 'allows Category as commentable type' do
      comment = Comment.new(commentable_type: 'Category')

      expect(comment.errors[:commentable_type]).to be_empty
    end

    it 'does not allow invalid commentable types' do
      comment = Comment.new(commentable_type: 'User')

      expect(comment).not_to be_valid
      expect(comment.errors[:commentable_type]).to include(
        'is not included in the list'
      )
    end
  end
end
