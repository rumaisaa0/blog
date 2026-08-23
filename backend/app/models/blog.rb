class Blog < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :comments, as: :commentable

  validates :title, presence: true
  validates :content, presence: true
  validates :category, presence: true
end
