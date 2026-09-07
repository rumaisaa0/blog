module UserAbility
  def user_permissions(user)
    can :read, User, organization_id: user.organization_id
    can :update, User, id: user.id, organization_id: user.organization_id
  end
end