module Services
  class TmdbService
    include HTTParty

    #method to searc the tmdb for movies.
    #The method is set up to hit the apps db first. Then the Api and remove any duplicates
    def self.find_from_tmdb(search)
      api_id = ENV['tmdb_api_key']
      db_movies = Movie.where("title ILIKE ?", "%#{search}%")
      remove_movies = db_movies.map do |item|
        {
          title: item['title'],
          poster: item['poster'],
          id: item['api_id'],
          rating: item['rating']
        }
      end
      response = get "https://api.themoviedb.org/3/search/movie?api_key=#{api_id}&language=en-US&query=#{search}&page=1&include_adult=false"
      items = response['results']
      movies =items.map do |item|
        {
          title: item['title'],
          poster: "https://image.tmdb.org/t/p/original#{item['poster_path']}",
          id: item['id'],
          rating: item['vote_average']
        }
      end
      results = movies - remove_movies
    end

    #Since the api search function doesn't provide all relavent info once the user gets a list of movies they are looking for
    #When they click into a api movie the movie will epxand and use this method to get more details on the movie from the tmdb api.
    def self.tmdb_movie(movie_id)
      api_id = ENV['tmdb_api_key']
      response = get "https://api.themoviedb.org/3/movie/#{movie_id}?api_key=#{api_id}&language=en-US"
      movie = {
        title: response['title'],
        poster: "https://image.tmdb.org/t/p/original#{response['poster_path']}",
        plot: response['overview'],
        rating: response['vote_average'],
        id: response['id'],
        imdb_id: response['imdb_id'],
        tag_line: response['tagline'],
        genre: response['genres'].first['name']
      }
    end
  end

end
