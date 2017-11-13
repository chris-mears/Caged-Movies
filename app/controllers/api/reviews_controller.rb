class Api::ReviewsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show, :search]

  def index
    @reviews = Review.includes(:movie).order('created_at Desc').all
    render json: @reviews, include: [:movie]
  end

  def search
    @movies = Movie.includes(:reviews).where("title ILIKE ?", "%#{params[:title]}%")
    @reviews = []
    @movies.each do |movie|
      @reviews << movie.reviews
    end
    @reviews.flatten!
    render json: { movies: @movies, reviews: @reviews }
  end

  def show
    @review = Review.includes(:movie).find(params[:id])
    render json: @review, include: [:movie]
  end

  def create
    @user = current_user
    @review = @user.reviews.build(review_params)
    if @user.save
      render json: @review
    end
  end

  def update
    @review = Review.find(params[:id])
    @review.update_attributes(review_params)
    render json: @review, include: [:movie]
  end

  def destroy
    @review = Review.delete(params[:id])
    render json: { msg: "Delete Successful" }
  end

  private

  def review_params
    params.require(:review).permit(:title, :body, :likes, :genre, :movie_id)
  end
end
