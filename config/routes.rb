Rails.application.routes.draw do
  get 'tmdb_api_search/index'

  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    resources :movies, only: [:create, :update, :show, :index] do
      get 'search', on: :collection
    end
    resources :reviews, only: [:create, :destroy, :update, :show, :index] do
      get 'search', on: :collection
      get 'search_tmdb', on: :collection
    end
    resources :favorite_movies, only: [:index, :create, :destroy]
    resources :watch_list_movies, only: [:index, :create, :destroy]
    resources :movie_comments, only: [:create, :destroy, :update]
    resources :review_likes, only: [:create, :destroy]
    resources :review_comments, only: [:create, :destroy, :update]

    get "user_reviews", to: "reviews#userindex"
    get "/user", to: "user#show"
    get "tmdb_movies", to: "tmdb_api_search#index"
    get "tmdb_movies/:id", to: "tmdb_api_search#show"
  end
end
