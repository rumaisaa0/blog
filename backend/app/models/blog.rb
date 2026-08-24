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
  has_many :comments, as: :commentable

  validates :title, presence: true
  validates :content, presence: true
  validates :category, presence: true
end
