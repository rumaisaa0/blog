# frozen_string_literal: true

class AddOrganizationToBlogEditRequests < ActiveRecord::Migration[6.1]
  def change
    add_reference :blog_edit_requests, :organization, null: false, default: 1
  end
end
