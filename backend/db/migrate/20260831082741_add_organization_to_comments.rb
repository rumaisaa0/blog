# frozen_string_literal: true

class AddOrganizationToComments < ActiveRecord::Migration[6.1]
  def change
    add_reference :comments, :organization, null: false, default: 1
  end
end
