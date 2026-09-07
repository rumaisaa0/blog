# frozen_string_literal: true

class AddOrganizationToBlogContributors < ActiveRecord::Migration[6.1]
  def change
    add_reference :blog_contributors, :organization, null: false,default: 1
  end
end
