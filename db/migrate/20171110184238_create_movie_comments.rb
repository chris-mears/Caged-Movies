class CreateMovieComments < ActiveRecord::Migration[5.1]
  def change
    create_table :movie_comments do |t|
      t.references :user, foreign_key: true
      t.references :movie, foreign_key: true
      t.string :body

      t.timestamps
    end
  end
end
