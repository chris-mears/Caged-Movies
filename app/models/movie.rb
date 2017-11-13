class Movie < ApplicationRecord

  has_many :reviews, dependent: :destroy
  has_many :favorite_movies, dependent: :destroy
  has_many :movie_comments, dependent: :destroy
end
