class Api::WatchListMoviesController < ApplicationController
  before_action :authenticate_user!
  #   load_and_authorize_resource

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
