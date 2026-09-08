# frozen_string_literal: true

# cancan ability class for rbac
class Ability
  include CanCan::Ability

  include UserAbility
  include CategoryAbility
  include CommentAbility
  include BlogEditRequestAbility
  include BlogContributorAbility
  include BlogAbility

  def initialize(user)
    user ||= User.new # guest

    if user.admin?
      admin_permissions(user)

    elsif user.registered?
      registered_permissions(user)

    elsif user.guest?
      # guest — not logged in
      guest_permissions
    end
  end

  private

  def registered_permissions(user)
    blog_contributor_permissions(user)
    blog_edit_request_permissions(user)
    blog_permissions(user)
    comment_permissions(user)
    user_permissions(user)
    category_permissions(user)
  end

  def guest_permissions
    can :read, Category
    can :read, Blog
    can :read, Comment
  end

  def admin_permissions(user)
    can :manage, :all, organization_id: user.organization_id
  end
end
