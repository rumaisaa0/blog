class AddOrganizationToBlogEditRequests < ActiveRecord::Migration[6.1]
  def change
    add_reference :blog_edit_requests, :organization, null: false, foreign_key: true, default: 1
  end
end
