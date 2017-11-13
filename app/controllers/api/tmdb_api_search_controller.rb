require 'tmdb_service'

class Api::TmdbApiSearchController < ApplicationController

  def index
    @movies = Services::TmdbService.find_from_tmdb(params[:title])
    render json: @movies
  end

  def show
    @movie = Services::TmdbService.tmdb_movie(params[:id])
    render json: @movie
  end
end
