# frozen_string_literal: true

class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.text :content, null: false
      t.references :user, null: false
      t.references :commentable, polymorphic: true, null: false
      t.references :organization, null: false, default: 1
      t.timestamps
    end
  end
end
