class Review < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :title, presence: true
  validates :body, presence: true

  has_many :review_likes, dependent: :destroy
  has_many :review_comments, dependent: :destroy
end
