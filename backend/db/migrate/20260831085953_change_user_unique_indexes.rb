class ChangeUserUniqueIndexes < ActiveRecord::Migration[6.1]
  def change
    remove_index :users, name: "index_users_on_email"
    remove_index :users, name: "index_users_on_username"

    add_index :users, [:organization_id, :email], unique: true
    add_index :users, [:organization_id, :username], unique: true
  end
end