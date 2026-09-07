# frozen_string_literal: true

class AddOrganizationToBlogs < ActiveRecord::Migration[6.1]
  def change
    add_reference :blogs, :organization, null: false,  default: 1
  end
end
