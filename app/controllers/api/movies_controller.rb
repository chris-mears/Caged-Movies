class Api::MoviesController < ApplicationController

  #Index method for Movies
  def index
    @movies = Movie.order('likes Desc').all
    render json: @movies
  end

  def show
    @movie = Movie.find_by_id(params[:id])
    render json: @movie
  end

  def update
    @movie = Movie.find_by_id(params[:id])
    @movie.update_attributes(movie_params)
    render json: @movie
  end

  def create
    @movie = Movie.create!(movie_params)
    render json: @movie
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :plot, :poster, :rating, :likes, :api_id, :imdb_id, :tag_line, :genre)
  end
end
