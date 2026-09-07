# frozen_string_literal: true

# Table name: blog_edit_requests
#  id             :bigint           not null, primary key
#  blog_id        :bigint           not null
#  contributor_id :bigint           not null
#  category_id    :bigint           not null
#  title          :string
#  content        :text
#  status         :string           default("pending")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class BlogEditRequest < ApplicationRecord
  STATUS = %w[pending approved rejected].freeze

  acts_as_tenant :organization

  belongs_to :blog
  belongs_to :contributor, class_name: 'User', foreign_key: :contributor_id
  belongs_to :category

  validates :status, :title, :content, presence: true
  validates :status, inclusion: { in: STATUS }
end
