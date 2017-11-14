class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    can :read, Movie
    can :read, Review

    can [:destroy, :update, :create], Review do |review|
      review.user == user
    end
  end
end
