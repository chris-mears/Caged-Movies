class RemoveTypeFromFavoriteMovies < ActiveRecord::Migration[5.1]
  def change
    remove_column :favorite_movies, :type, :string
  end
end
