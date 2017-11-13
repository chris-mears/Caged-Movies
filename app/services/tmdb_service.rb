module Services
  class TmdbService
    include HTTParty

    def self.find_from_tmdb(search)
      api_id = ENV['tmdb_api_key']
      db_movies = Movie.where("title ILIKE ?", "%#{search}%")
      remove_movies = []
      db_movies.each do |item|
        movie = {
          title: item['title'],
          poster: item['poster'],
          id: item['api_id'],
          rating: item['rating']
        }
        remove_movies << movie
      end
      response = get "https://api.themoviedb.org/3/search/movie?api_key=#{api_id}&language=en-US&query=#{search}&page=1&include_adult=false"
      items = response['results']
      movies =[]
      items.each do |item|
        movie = {
          title: item['title'],
          poster: "https://image.tmdb.org/t/p/original#{item['poster_path']}",
          id: item['id'],
          rating: item['vote_average']
        }
        movies << movie
      end
      results = movies - remove_movies
      return results
    end

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
