# frozen_string_literal: true

# imported in ability.rb
#
module BlogContributorAbility
  def blog_contributor_permissions(user)
    can :manage, BlogContributor, blog: { user_id: user.id }, organization_id: user.organization_id
  end
end
