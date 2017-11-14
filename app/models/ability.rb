class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    can :read, [Movie, Review]
    can :manage, FavoriteMovie, user_id: user.id
    can [:destroy, :create, :update], [Review] do |review|
      review.user == user
    end
  end
end
