module BlogAbility
  def blog_permissions(user)
    can :read, Blog

    can :create, Blog, organization_id: user.organization_id

    can :update, Blog,
        user_id: user.id,
        organization_id: user.organization_id

    can :destroy, Blog,
        user_id: user.id,
        organization_id: user.organization_id
  end
end