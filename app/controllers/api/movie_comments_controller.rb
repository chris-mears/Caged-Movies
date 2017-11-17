class Api::MovieCommentsController < ApplicationController
  before_action :authenticate_user!

  #create a comment for a movie only signed in users can utilize in app
  def create
    @user = current_user
    @movie_comment = @user.movie_comments.build(comment_params)
    if @user.save
      render json: @movie_comment
    end
  end

  #allow a user to update one of their comments. This is deterimined in the show route for a movie on the movie controller
  def update
    @user = current_user
    @movie_comment = MovieComment.find(params[:id])
    @movie_comment.update_attributes(comment_params)
    render json: @movie_comment
  end

  #allow a user to destroy one of their comments. This is deterimined in the show route for a movie on the movie controller
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
