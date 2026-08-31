class CreateBlogEditRequests < ActiveRecord::Migration[6.1]
  def change
create_table :blog_edit_requests do |t|
  t.references :blog, null: false, foreign_key: true
  t.references :contributor, null: false, foreign_key: { to_table: :users }
  t.references :category, null: false, foreign_key: true

  t.string :title
  t.text :content
  t.string :status, null: false, default: "pending"

  t.timestamps
    end
  end
end
