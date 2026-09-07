module CommentAbility
  def comment_permissions(user)
    can :create, Comment, organization_id: user.organization_id
    can :read, Comment, organization_id: user.organization_id
    # can :update, Comment, user_id: user.id, organization_id: user.organization_id
    # can :destroy, Comment, user_id: user.id, organization_id: user.organization_id
  end
end