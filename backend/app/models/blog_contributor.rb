# frozen_string_literal: true

# Table name: blog_contributors
#  id         :bigint           not null, primary key
#  blog_id    :bigint           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class BlogContributor < ApplicationRecord
  acts_as_tenant :organization

  belongs_to :blog
  belongs_to :user

  validates :user_id, uniqueness: { scope: :blog_id, message: 'is already a contributor' }
end
