class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :body
      t.integer :likes
      t.references :user, foreign_key: true
      t.references :movie, foreign_key: true
      t.string :genre

      t.timestamps
    end
  end
end
