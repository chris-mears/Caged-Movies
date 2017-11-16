class Api::MovieCommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @user = current_user
    @movie_comment = @user.movie_comments.build(comment_params)
    if @user.save
      render json: @movie_comment
    end
  end

  def update
    @user = current_user
    @movie_comment = MovieComment.find(params[:id])
    @movie_comment.update_attributes(comment_params)
    render json: @movie_comment
  end

  def destroy
    @user = current_user
    @movie_comment = MovieComment.find(params[:id]).delete
    render json: { msg: "Delete Successful" }
  end

  private

  def comment_params
    params.require(:movie_comment).permit(:body, :movie_id)
  end
end
