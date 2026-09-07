# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:commentable) }
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
