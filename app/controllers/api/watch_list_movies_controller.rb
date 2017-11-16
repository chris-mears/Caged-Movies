class Api::WatchListMoviesController < ApplicationController
  before_action :authenticate_user!
  #   load_and_authorize_resource

  def index
    # need user, reviews, favorite movies, and watchlist

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

  def create
    @user = current_user
    @watch_list_movie = @user.watch_list_movies.build(watchlist_movie_params)
    if @user.save
      render json: @watch_list_movie
    end
  end

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
