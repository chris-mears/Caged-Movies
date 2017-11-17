class MovieComment < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :body, presence: true

end
