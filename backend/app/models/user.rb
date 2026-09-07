# frozen_string_literal: true

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
#  organization_id        :bigint           default(1), not null
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  ROLES = %w[admin registered].freeze

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  acts_as_tenant :organization

  has_many :blog_contributors, dependent: :destroy
  has_many :contributed_blogs, through: :blog_contributors, source: :blog
  has_many :blog_edit_requests, foreign_key: :contributor_id, dependent: :destroy
  has_many :categories, dependent: :restrict_with_error
  has_many :blogs, dependent: :restrict_with_error
  has_many :comments, dependent: :restrict_with_error

  validates :username, presence: true, uniqueness: { scope: :organization_id }
  validates :email, presence: true, uniqueness: { scope: :organization_id }
  validates :role, presence: true, inclusion: { in: ROLES }

  def as_json(options = {})
    super(options.merge(only: %i[id email username role]))
  end

  def admin?
    persisted? && role == 'admin'
  end

  def registered?
    persisted? && role == 'registered'
  end

  def guest?
    !persisted?
  end
end
