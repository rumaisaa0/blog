# Table name: users
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  jti                    :string
#  role                   :string           default("registered")
#  username               :string           not null
#
# Indexes
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_username              (username) UNIQUE
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :categories, dependent: :restrict_with_error
  has_many :blogs, dependent: :restrict_with_error
  has_many :comments, dependent: :restrict_with_error
  validates :username, presence: true
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin registered] }
  def as_json(options={})
    super(options.merge(only: %i[id email username role]))
  end
end