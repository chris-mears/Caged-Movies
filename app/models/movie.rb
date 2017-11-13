class Movie < ApplicationRecord

  has_many :reviews, dependent: :destroy
  has_many :favorite_movies, dependent: :destroy
  has_many :movie_comments, dependent: :destroy

  include HTTParty

  def self.find_from_tmdb(search)
    api_id = ENV['tmdb_api_key']
    movie = find_by api_id: api_id
    return movie unless movie.nil?
    response = get "https://api.themoviedb.org/3/search/movie?api_key=#{api_id}&language=en-US&query=#{search}&page=1&include_adult=false"
  end

  def self.tmdb_movie(movie_id)
    api_id = ENV['tmdb_api_key']
    response = get "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{api_id}&language=en-US"
  end
end
