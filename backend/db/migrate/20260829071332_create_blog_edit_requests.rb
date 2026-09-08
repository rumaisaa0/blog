# frozen_string_literal: true

class CreateBlogEditRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :blog_edit_requests do |t|
      t.references :blog, null: false
      t.references :requestor, null: false
      t.references :category, null: false

      t.string :title, null: false
      t.text :content, null: false
      t.string :status, null: false, default: 'pending'

      t.references :organization, null: false, default: 1

      t.timestamps
    end
  end
end
