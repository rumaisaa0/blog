class BlogEditRequest < ApplicationRecord
  belongs_to :blog
  acts_as_tenant :organization
  belongs_to :contributor, class_name: "User", foreign_key: :contributor_id
  belongs_to :category
  validates :status, presence: true
  validates :title, presence: true
  validates :content, presence: true

  validates :status, inclusion: { in: %w[pending approved rejected] }
end