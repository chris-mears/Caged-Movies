class Api::FavoriteMoviesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  #This route will provide all of the favorite movies for the current user
  def index
    @user = User
      .left_joins(:favorites).includes(:favorites)
      .find(current_user.id)

    favorite_movies = @user.favorites.map do |favorite_movie|
      {
        id: favorite_movie.id,
        title: favorite_movie.title,
        poster: favorite_movie.poster,
        tag_line: favorite_movie.tag_line
      }
    end

    render json: favorite_movies
  end

  #This route will allow a user to add a movie to their favorite movies list
  def create
    @user = current_user
    @favorite_movie = @user.favorite_movies.build(favorite_movie_params)
    if @user.save
      render json: @favorite_movie
    end
  end

  #This route will allow a user to remove a movie from their favorites list
  def destroy
    @user = current_user
    @FavoriteMovie = FavoriteMovie.find(params[:id]).delete
    render json: { msg: "Delete Successful" }
  end

  private

  def favorite_movie_params
    params.require(:favorite_movie).permit(:movie_id)
  end
end
