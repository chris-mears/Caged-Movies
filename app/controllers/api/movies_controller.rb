class Api::MoviesController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show, :search, :random]

  #method to get all the movies for the main page. Eventually need to refactor to limit number coming back
  #also formats movie to indicate if they are aprt of the users favorites or watch list
  def index
    @user = current_user
    if @user != nil
      @favorites = @user.favorite_movies
      @watchlist = @user.watch_list_movies
    end
    @movies = Movie.order('likes Desc').all

    @results = []
    @movies.each do |movie|
      hash =  {
        title: movie.title,
        id: movie.id,
        likes: movie.likes
      }
      if @user != nil
        @favorites.each do |favorite|
          if favorite.movie_id == movie.id
            hash[:favorite] = true
            hash[:favorite_id] = favorite.id
          end
        end
        @watchlist.each do |wlm|
          if wlm.movie_id == movie.id
            hash[:in_watchlist] = true
            hash[:watchlist_movie_id] = wlm.id
          end
        end
      end
      @results << hash
    end
    render json: @results
  end

  #method to search movies by their title or by their genre
  #also formats movie to indicate if they are aprt of the users favorites or watch list
  #also has some search logic. User needs to type more than three characters before it will search the db
  def search
    @user = current_user
    if @user != nil
      @favorites = @user.favorite_movies
      @watchlist = @user.watch_list_movies
    end
    if params[:title]
      if params[:title] == ''
        render json: {msg: 'Please enter in a Movie'}
      elsif params[:title].length <= 3
        render json: {msg: 'Please enter more than three Characters'}
      else
        @movies = Movie.includes(:reviews).where("title ILIKE ?", "%#{params[:title]}%")
        @reviews = @movies.map do |movie|
          movie.reviews
        end
        @results = []
        @movies.each do |movie|
          hash = {
            title: movie.title,
            id: movie.id,
            poster: movie.poster,
            tag_line: movie.tag_line,
            likes: movie.likes
          }
          if @user != nil
            @favorites.each do |favorite|
              if favorite.movie_id == movie.id
                hash[:favorite] = true
                hash[:favorite_id] = favorite.id
              end
            end
            @watchlist.each do |wlm|
              if wlm.movie_id == movie.id
                hash[:in_watchlist] = true
                hash[:watchlist_movie_id] = wlm.id
              end
            end
          end
          @results << hash
        end
        @reviews.flatten!
        render json: {movies: @results, reviews: @reviews}
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

        @results = []
        @movies.each do |movie|
          hash = {
            title: movie.title,
            id: movie.id,
            poster: movie.poster,
            tag_line: movie.tag_line,
            likes: movie.likes
          }
          if @user != nil
            @favorites.each do |favorite|
              if favorite.movie_id == movie.id
                hash[:favorite] = true
                hash[:favorite_id] = favorite.id
              end
            end
            @watchlist.each do |wlm|
              if wlm.movie_id == movie.id
                hash[:in_watchlist] = true
                hash[:watchlist_movie_id] = wlm.id
              end
            end
          end
          @results << hash
        end

        render json: {movies: @results, reviews: @reviews}
      end
    end
  end

  #method to show an individual movie
  #Also grabs reviews and comments for that movie to dsiplay on the movie page in app
  #Also formats review and comments to indicate if they belong to current user
  #and checks to see if the movie is apart of the users favorites or watch list
  def show
    @user = current_user
    @movie = Movie
      .left_joins(:reviews).includes(:reviews)
      .left_joins(:movie_comments).includes(:movie_comments)
      .find_by_id(params[:id])
    @reviews = @movie.reviews.map do |review|
      {
        title: review.title,
        id: review.id,
        belongs_to_user: review.user == @user
      }
    end
    @comments = @movie.movie_comments.map do |comment|
      if @user != nil
        belongs_to_user = @user.id == comment.user_id
      else
        belongs_to_user = false
      end
      {
        id: comment.id,
        body: comment.body,
        author: comment.user.nickname,
        author_image: comment.user.image,
        belongs_to_user: belongs_to_user
      }
    end
    @comments.reverse!
    if @user != nil
      @favorite = FavoriteMovie.where("user_id = ? AND movie_id = ?", @user.id, @movie.id)
      @watchlist = WatchListMovie.where("user_id = ? AND movie_id = ?", @user.id, @movie.id)
    end
    if @user != nil
      if @favorite.empty?
        favorite_id = 'null'
      else
        favorite_id = @favorite[0].id
      end
      if @watchlist.empty?
        watchlist_id = 'null'
      else
        watchlist_id = @watchlist[0].id
      end
      result = {
        favorite: !@favorite.empty?,
        favorite_id: favorite_id,
        in_watchlist: !@watchlist.empty?,
        watchlist_id: watchlist_id
      }
    elsif @user == nil
      result = {
        favorite: false,
        favorite_id: 'null',
        in_watchlist: false,
        watchlist_id: 'null'
      }
    end
    render json: {movie: @movie, reviews: @reviews, favorite: result, comments: @comments }
  end

  #grabs a random movie from the db for the main page
  def random
    @movies = Movie.all
    movies = @movies.map do |movie|
      {
        title: movie.title,
        id: movie.id,
        plot: movie.plot,
        poster: movie.poster,
        rating: movie.rating,
        likes: movie.likes,
        api_id: movie.api_id,
        tag_line: movie.tag_line,
        genre: movie.genre
      }
    end
    @movie = movies.sample
    render json: @movie
  end

  #allows a movie to be updated.
  #Using this with users favorites so the movie's likes count will go up when added to a users favorites and down when removed
  def update
    @user = current_user
    @movie = Movie.find_by_id(params[:id])
    @movie.update_attributes(movie_params)
    render json: @movie
  end

  #Allows a movie to be created in db. This is used with the api so when a user finds a movie they like from tmdb it can be saved to the app's db
  def create
    @movie = Movie.create!(movie_params)
    render json: @movie
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :plot, :poster, :rating, :likes, :api_id, :imdb_id, :tag_line, :genre)
  end
end
