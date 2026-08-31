class AddOrganizationToComments < ActiveRecord::Migration[6.1]
  def change
    add_reference :comments, :organization, null: false, foreign_key: true, default: 1
  end
end
