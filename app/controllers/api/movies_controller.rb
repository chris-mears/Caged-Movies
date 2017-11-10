class Api::MoviesController < ApplicationController

  #Index method for Movies
  def index
    @movies = Movie.all
    render json: @movies
  end

  def show
    @movie = Movie.find_by_id(params[:id])
    render json: @movie
  end
end
