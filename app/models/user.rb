class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :reviews, dependent: :destroy
  has_many :favorite_movies, dependent: :destroy
  has_many :review_likes, dependent: :destroy
  has_many :review_comments, dependent: :destroy
  has_many :movie_comments, dependent: :destroy
end
