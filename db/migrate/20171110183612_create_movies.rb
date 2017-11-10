class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :plot
      t.string :poster
      t.float :rating
      t.integer :likes
      t.integer :api_id
      t.string :imdb_id
      t.string :tag_line
      t.string :genre

      t.timestamps
    end
  end
end
