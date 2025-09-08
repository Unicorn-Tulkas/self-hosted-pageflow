# frozen_string_literal: true

# REQUIRED: ActiveAdmin Comments table for admin interface comments functionality
# 
# IMPORTANT: This migration creates the basic ActiveAdmin::Comment table that
# ActiveAdmin expects to exist for its comments feature to work properly.
# 
# This file exists because:
# 1. ActiveAdmin includes a Comments tab in the admin interface by default
# 2. Without this table, the Comments tab returns a 500 error
# 3. ActiveAdmin generators don't create this migration automatically
# 4. The table must exist before the admin interface is fully functional
class CreateActiveAdminComments < ActiveRecord::Migration[7.1]
  def change
    create_table :active_admin_comments do |t|
      t.string :namespace
      t.text   :body
      t.references :resource, polymorphic: true, null: false
      t.references :author, polymorphic: true, null: false
      t.timestamps null: false
    end

    add_index :active_admin_comments, [:namespace]
    add_index :active_admin_comments, [:resource_type, :resource_id]
  end
end