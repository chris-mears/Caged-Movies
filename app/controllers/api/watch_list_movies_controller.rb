class Api::WatchListMoviesController < ApplicationController
  before_action :authenticate_user!
  #   load_and_authorize_resource

  #utilizing this method to pull in the current users watch list of movies
  def index
    @user = User
      .left_joins(:watch_list).includes(:watch_list)
      .find(current_user.id)

    watch_list = @user.watch_list.map do |watch_list_movie|
      {
        id: watch_list_movie.id,
        title: watch_list_movie.title,
        poster: watch_list_movie.poster,
        tag_line: watch_list_movie.tag_line
      }
    end

    render json: watch_list
  end

  #This method allows a user to add a movie to their watchlist
  def create
    @user = current_user
    @watch_list_movie = @user.watch_list_movies.build(watchlist_movie_params)
    if @user.save
      render json: @watch_list_movie
    end
  end

  #This method allows a user to remove a method from their watchlist
  def destroy
    @user = current_user
    @watch_list_movie = WatchListMovie.find(params[:id]).delete
    render json: { msg: "Delete Successful" }
  end

  private

  def watchlist_movie_params
    params.require(:watch_list_movie).permit(:movie_id)
  end
end
