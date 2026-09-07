# frozen_string_literal: true

class CreateBlogContributors < ActiveRecord::Migration[6.1]
  def change
    create_table :blog_contributors do |t|
      t.references :blog, null: false
      t.references :user, null: false

      t.timestamps
    end
  end
end
