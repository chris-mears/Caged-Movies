class CreateReviewLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :review_likes do |t|
      t.references :user, foreign_key: true
      t.references :review, foreign_key: true

      t.timestamps
    end
  end
end
