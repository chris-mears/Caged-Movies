class Api::MoviesController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :search]
  load_and_authorize_resource only: [:create, :update]

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
        @movies = Movie.includes(:reviews).where("title ILIKE ?", "%#{params[:title]}%")
        @reviews = []
        @movies.each do |movie|
          @reviews << movie.reviews
        end
        @reviews.flatten!
        render json: {movies: @movies, reviews: @reviews}
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
    @user = current_user
    @movie = Movie.includes(:reviews).find_by_id(params[:id])
    @reviews = []
    @movie.reviews.each do |review|
      hash = {
        title: review.title,
        id: review.id,
        belongs_to_user: review.user == @user
      }
      @reviews << hash
    end
    @favorite = FavoriteMovie.where("user_id = ? AND movie_id = ?", @user.id, @movie.id)
    if @favorite.empty?
      id = 'null'
    else
      id = @favorite[0].id
    end
    result = {
      favorite: !@favorite.empty?,
      favorite_id: id
    }
    render json: {movie: @movie, reviews: @reviews, favorite: result}
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
