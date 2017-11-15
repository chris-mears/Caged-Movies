class CreateWatchListMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :watch_list_movies do |t|
      t.references :user, foreign_key: true
      t.references :movie, foreign_key: true

      t.timestamps
    end
  end
end
