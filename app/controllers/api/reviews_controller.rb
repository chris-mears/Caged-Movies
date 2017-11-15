class Api::ReviewsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show, :search]
  # load_and_authorize_resource only: [:destroy, :update]

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
    @user = current_user
    @review = Review.includes(:movie).find(params[:id])
    if @user != nil
      @review_likes = ReviewLike.where("user_id = ? AND review_id = ?", @user.id, @review.id)
      if @review_likes.empty?
        review_like_id = 'null'
      else
        review_like_id = @review_likes[0].id
      end
    else
      review_like_id = 'null'
    end

    review = {
      title: @review.title,
      id: @review.id,
      body: @review.body,
      genre: @review.genre,
      movie: @review.movie,
      belongs_to_user: @review.user == @user,
      review_like_id: review_like_id,
      review_liked: !@review_likes.empty?
    }
    render json: review
  end

  def create
    @user = current_user
    @review = @user.reviews.build(review_params)
    if @user.save
      render json: @review
    end
  end

  def update
    @user = current_user
    @review = Review.find(params[:id])
    @review.update_attributes(review_params)
    render json: @review, include: [:movie]
  end

  def destroy
    @user = current_user
    @review = Review.find(params[:id]).delete
    render json: { msg: "Delete Successful" }
  end

  private

  def review_params
    params.require(:review).permit(:title, :body, :likes, :genre, :movie_id)
  end
end
