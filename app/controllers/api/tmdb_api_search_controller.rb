class Api::TmdbApiSearchController < ApplicationController

  def index
    @movies = Movie.find_from_tmdb(params[:title])
    render json: @movies
  end
end
