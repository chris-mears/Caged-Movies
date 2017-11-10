class CreateReviewComments < ActiveRecord::Migration[5.1]
  def change
    create_table :review_comments do |t|
      t.references :user, foreign_key: true
      t.references :review, foreign_key: true
      t.string :body

      t.timestamps
    end
  end
end
