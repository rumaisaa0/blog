# frozen_string_literal: true

# Table name: blogs
#  id          :bigint           not null, primary key
#  title       :string
#  content     :text
#  user_id     :bigint           not null
#  category_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#  index_blogs_on_category_id  (category_id)
#  index_blogs_on_user_id      (user_id)
class Blog < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :blog_contributors, dependent: :destroy
  has_many :contributors, through: :blog_contributors, source: :user
  has_many :blog_edit_requests, dependent: :destroy
  has_many :comments, as: :commentable
  has_one_attached :image
  acts_as_tenant :organization
  validates :title, presence: true, length: { maximum: 255 }
  validates :content, presence: true
  validates :category, presence: true
end
