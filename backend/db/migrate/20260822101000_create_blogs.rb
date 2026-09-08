# frozen_string_literal: true

class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.references :user, null: false
      t.references :category, null: false
      t.references :organization, null: false, default: 1

      t.timestamps
    end
  end
end
