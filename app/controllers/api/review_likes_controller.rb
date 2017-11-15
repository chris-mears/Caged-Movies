class Api::ReviewLikesController < ApplicationController
  def create
    @user = current_user
    @review_like = @user.review_likes.build(review_like_params)
    if @user.save
      render json: @review_like
    end
  end

  def destroy
    @user = current_user
    @review_like = ReviewLike.find(params[:id]).delete
    render json: { msg: "Delete Successful" }
  end

  private

  def review_like_params
    params.require(:review_like).permit(:review_id)
  end
end
