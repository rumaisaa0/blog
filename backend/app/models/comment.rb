class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true
  validates :commentable_type, inclusion: { in: %w[Blog Category] }
end
