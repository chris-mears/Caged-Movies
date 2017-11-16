class Api::ReviewCommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @user = current_user
    @review_comment = @user.review_comments.build(comment_params)
    if @user.save
      render json: @review_comment
    end
  end

  def update
    @user = current_user
    @review_comment = ReviewComment.find(params[:id])
    @review_comment.update_attributes(comment_params)
    render json: @review_comment
  end

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
