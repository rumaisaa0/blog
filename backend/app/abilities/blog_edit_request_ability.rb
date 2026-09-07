module BlogEditRequestAbility
  def blog_edit_request_permissions(user)
    can :create, BlogEditRequest, requestor_id: user.id, organization_id: user.organization_id
    can :manage, BlogEditRequest, blog: { user_id: user.id }, organization_id: user.organization_id
  end
end
