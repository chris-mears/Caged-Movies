Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    resources :movies, only: [:create, :update, :show, :all]
    resources :reviews, only: [:create, :destroy, :update, :show, :all]
    resources :favorite_movies, only: [:create, :destroy, :update]
    resources :movie_comment, only: [:create, :destroy, :update]
    resources :review_likes, only: [:create, :destroy]
    resources :review_comments, only: [:create, :destroy, :update]
  end
end
