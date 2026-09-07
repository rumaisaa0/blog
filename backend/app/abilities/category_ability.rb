module CategoryAbility
  def category_permissions(user)
    can :read, Category, organization_id: user.organization_id
  end

  def category_permission_for_admin(user)
    can :manage, Category, organization_id: user.organization_id
  end
end
