# frozen_string_literal: true

class CreateBlogEditRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :blog_edit_requests do |t|
      t.references :blog, null: false
      t.references :contributor, null: false, foreign_key: { to_table: :users }
      t.references :category, null: false

      t.string :title
      t.text :content
      t.string :status, null: false, default: 'pending'

      t.timestamps
    end
  end
end
