class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    can :read, Movie
    can :read, Review

    can [:destroy, :update], Review do |review|
      review.user == user
    end

    can [:destroy, :update], FavoriteMovie do |favorite|
      favorite.user == user
    end
  end
end
