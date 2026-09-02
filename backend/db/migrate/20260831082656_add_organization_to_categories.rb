# frozen_string_literal: true

class AddOrganizationToCategories < ActiveRecord::Migration[6.1]
  def change
    add_reference :categories, :organization, null: false, foreign_key: true, default: 1
  end
end
