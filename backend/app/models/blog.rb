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
  acts_as_tenant :organization

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  settings index: {
    number_of_shards: 1,
    number_of_replicas: 0
  } do
    mappings dynamic: false do
      indexes :title, type: 'text'
      indexes :content, type: 'text'
      indexes :organization_id, type: 'integer'
    end
  end

  belongs_to :user
  belongs_to :category
  has_many :blog_contributors, dependent: :destroy
  has_many :contributors, through: :blog_contributors, source: :user
  has_many :blog_edit_requests, dependent: :destroy
  has_many :comments, as: :commentable
  has_one_attached :image

  validates :title, presence: true, length: { maximum: 255 }
  validates :content, :category, presence: true, length: { maximum: 10_000 }

  def self.search(query, organization_id:, page: 1, per_page: 10)
    from = (page - 1) * per_page
    filters = []

    filters << { term: { organization_id: organization_id } } if organization_id.present?
    __elasticsearch__.search(
      query: {
        bool: {
          must: { multi_match: { query: query, fields: %w[title content], fuzziness: 'AUTO' } },
          filter: filters
        }
      },
      from: from, size: per_page
    )
  end
end
