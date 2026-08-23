# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new  # guest / not logged in

    if user.persisted? && user.role == "admin"
      can :manage, :all

    elsif user.persisted? && user.role == "registered"
      can :read, Category
      can :read, Blog
      can :create, Blog
      can :update, Blog, user_id: user.id
      can :destroy, Blog, user_id: user.id
      can :create, Comment
      can :read, Comment
      can :read, User, id: user.id
      can :update, User, id: user.id

    else
      # guest — not logged in
      can :read, Category
      can :read, Blog
      can :read, Comment
    end
    # Define abilities for the user here. For example:
    #
    #   return unless user.present?
    #   can :read, :all
    #   return unless user.admin?
    #   can :manage, :all
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, published: true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md
  end
end
