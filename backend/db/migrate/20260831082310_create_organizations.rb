# frozen_string_literal: true

class CreateOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :subdomain

      t.timestamps
    end
  end
end
