class AddOrganizationToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_reference :blogs, :organization, null: false, foreign_key: true, default: 1
  end
end
