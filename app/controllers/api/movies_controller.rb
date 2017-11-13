class Api::MoviesController < ApplicationController

  #Index method for Movies
  def index
    @movies = Movie.order('likes Desc').all
    render json: @movies
  end

  def search
    if params[:title]
      if params[:title] == ''
        render json: {msg: 'Please enter in a Movie'}
      elsif params[:title].length <= 3
        render json: {msg: 'Please enter more than three Characters'}
      else
        @movies = Movie.where("title ILIKE ?", "%#{params[:title]}%")
        render json: @movies
      end
    elsif params[:genre]
      if params[:genre] == ''
        render json: {msg: 'Please enter in a Genre'}
      elsif params[:genre].length <= 3
        render json: {msg: 'Please enter more than three Characters'}
      else
        @movies = Movie.where("genre ILIKE ?", "%#{params[:genre]}%")
        @reviews = Review.where("genre ILIKE ?", "%#{params[:genre]}%")
        @movies.sort_by {|movie| movie['likes']}
        @reviews.sort_by {|review| review['likes']}
        render json: {movies: @movies, reviews: @reviews}
      end
    end
  end

  def show
    @movie = Movie.find_by_id(params[:id])
    render json: @movie, include: [:reviews]
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
