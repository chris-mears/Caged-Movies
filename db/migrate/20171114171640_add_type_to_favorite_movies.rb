class AddTypeToFavoriteMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :favorite_movies, :type, :integer
  end
end
