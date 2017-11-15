class Api::UserController < ApplicationController
  before_action :authenticate_user!

  def show
    # need user, reviews, favorite movies, and watchlist

    @user = User
      .left_joins(:reviews).includes(:reviews)
      .left_joins(:favorites).includes(:favorites)
      .left_joins(:watch_list).includes(:watch_list)
      .find(current_user.id)

    favorite_movies = @user.favorites.map do |favorite_movie|
      {
        id: favorite_movie.id,
        title: favorite_movie.title
      }
    end

    watch_list = @user.watch_list.map do |watch_list_movie|
      {
        id: watch_list_movie.id,
        title: watch_list_movie.title
      }
    end

    user_response = {
      user: @user,
      reviews: @user.reviews,
      favorite_movies: favorite_movies,
      watch_list: watch_list
    }

    render json: user_response
  end
end
