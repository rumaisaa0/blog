# Table name: categories
#  id         :bigint           not null, primary key
#  name       :string
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#  index_categories_on_user_id  (user_id)
class Category < ApplicationRecord
  acts_as_tenant :organization
  belongs_to :user
  has_many :blogs
end
