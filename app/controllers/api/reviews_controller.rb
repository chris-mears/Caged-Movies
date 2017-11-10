class Api::ReviewsController < ApplicationController

  def index
    @reviews = Review.includes(:movie).all
    render json: @reviews, include: [:movie]
  end

  def show
    @review = Review.includes(:movie).find(params[:id])
    render json: @review, include: [:movie]
  end

  def create
    @review = Review.create!(review_params)
    render json: @review, include: [:movie]
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
    params.require(:review).permit(:title, :body, :likes, :genre, :user_id, :movie_id)
  end
end
