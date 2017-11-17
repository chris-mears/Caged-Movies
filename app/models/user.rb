class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  validates :nickname, presence: true

  has_many :reviews, dependent: :destroy
  has_many :favorite_movies, dependent: :destroy
  has_many :favorites, through: :favorite_movies, source: :movie
  has_many :review_likes, dependent: :destroy
  has_many :review_comments, dependent: :destroy
  has_many :movie_comments, dependent: :destroy
  has_many :watch_list_movies, dependent: :destroy
  has_many :watch_list, through: :watch_list_movies, source: :movie
end
