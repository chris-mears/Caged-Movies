class ChangeTypeFromFavoriteMovies < ActiveRecord::Migration[5.1]
  def change
    rename_column :favorite_movies, :type, :favorite_type
  end
end
