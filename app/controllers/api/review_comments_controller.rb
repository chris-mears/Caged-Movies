class Api::ReviewCommentsController < ApplicationController
  before_action :authenticate_user!

  #allows a user to create a comment for a review
  def create
    @user = current_user
    @review_comment = @user.review_comments.build(comment_params)
    if @user.save
      render json: @review_comment
    end
  end

  #allows a user to update one of their comments for a review. Logic is in show route for review in review controller
  def update
    @user = current_user
    @review_comment = ReviewComment.find(params[:id])
    @review_comment.update_attributes(comment_params)
    render json: @review_comment
  end

  #allows a user to delete one of their comments for a review. Logic is in show route for review in review controller
  def destroy
    @user = current_user
    @review_comment = ReviewComment.find(params[:id]).delete
    render json: { msg: "Delete Successful" }
  end

  private

  def comment_params
    params.require(:review_comment).permit(:body, :review_id)
  end
end
