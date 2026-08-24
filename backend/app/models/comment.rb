# Table name: comments
#  id               :bigint           not null, primary key
#  content          :text
#  user_id          :bigint           not null
#  commentable_type :string           not null
#  commentable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#  index_comments_on_commentable  (commentable_type, commentable_id)
#  index_comments_on_user_id      (user_id)
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true
  validates :commentable_type, inclusion: { in: %w[Blog Category] }
end
