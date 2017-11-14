class Api::FavoriteMoviesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def create
    @user = current_user
    @favorite_movie = @user.favorite_movies.build(favorite_movie_params)
    if @user.save
      render json: @favorite_movie
    end
  end

  def favorite_movie_params
    params.require(:favorite_movie).permit(:movie_id, :favorite_type)
  end
end
