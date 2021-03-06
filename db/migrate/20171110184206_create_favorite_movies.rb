class CreateFavoriteMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :favorite_movies do |t|
      t.references :user, foreign_key: true
      t.references :movie, foreign_key: true
      t.string :type

      t.timestamps
    end
  end
end
