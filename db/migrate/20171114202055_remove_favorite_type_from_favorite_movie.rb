class RemoveFavoriteTypeFromFavoriteMovie < ActiveRecord::Migration[5.1]
  def change
    remove_column :favorite_movies, :favorite_type, :integer
  end
end
