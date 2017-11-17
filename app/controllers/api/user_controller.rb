class Api::UserController < ApplicationController
  before_action :authenticate_user!

  def show
    # need user, reviews, favorite movies, and watchlist

    # @user = User
    #   .left_joins(:reviews).includes(:reviews)
    #   .left_joins(:favorites).includes(:favorites)
    #   .left_joins(:watch_list).includes(:watch_list)
    #   .find(current_user.id)

    # favorite_movies = @user.favorites.map do |favorite_movie|
    #   {
    #     id: favorite_movie.id,
    #     title: favorite_movie.title
    #   }
    # end

    # watch_list = @user.watch_list.map do |watch_list_movie|
    #   {
    #     id: watch_list_movie.id,
    #     title: watch_list_movie.title
    #   }
    # end

    # user_response = {
    #   user: {
    #     nickname: @user.nickname,
    #     image: @user.image,
    #     name: @user.name
    #   },
    #   reviews: @user.reviews,
    #   favorite_movies: favorite_movies,
    #   watch_list: watch_list
    # }

    #keeping comments above was utilizing this method to bring in more user info but broke it apart to save on some potentially unneeded db calls

    #brings in basic user info when the app is loaded or when a user signs in
    @user = current_user
    user = {
      nickname: @user.nickname,
      image: @user.image,
      name: @user.name
    }

    render json: user
  end
end
