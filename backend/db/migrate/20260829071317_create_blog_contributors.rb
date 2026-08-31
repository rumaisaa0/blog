class CreateBlogContributors < ActiveRecord::Migration[6.1]
  def change
    create_table :blog_contributors do |t|
      t.references :blog, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
