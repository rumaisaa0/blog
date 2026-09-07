# frozen_string_literal: true

class CreateBlogs < ActiveRecord::Migration[6.1]
  def change
    create_table :blogs do |t|
      t.string :title
      t.text :content
      t.references :user, null: false
      t.references :category, null: false

      t.timestamps
    end
  end
end
