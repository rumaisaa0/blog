# frozen_string_literal: true

class BlogContributor < ApplicationRecord
  belongs_to :blog
  belongs_to :user
  acts_as_tenant :organization
  validates :user_id, uniqueness: { scope: :blog_id, message: 'is already a contributor' }
end
