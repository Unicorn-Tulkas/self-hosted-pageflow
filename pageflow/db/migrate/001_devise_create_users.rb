# frozen_string_literal: true

# REQUIRED: Base Devise Users table for Pageflow integration
# 
# IMPORTANT: This migration creates ONLY the basic Devise authentication fields.
# Pageflow will add its own fields (failed_attempts, locked_at, first_name, 
# last_name, suspended_at, locale, admin) via its own migrations.
#
# DO NOT add Pageflow-specific fields here - they will conflict with
# Pageflow's auto-generated migrations (*.pageflow.rb files).
#
# This file exists because:
# 1. Pageflow migrations expect a 'users' table to already exist
# 2. Pageflow's add_attributes_to_users.pageflow.rb tries to add columns to users
# 3. Without this base table, setup fails with "Table 'users' doesn't exist"
class DeviseCreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable (optional - uncomment if needed)
      # t.integer  :sign_in_count, default: 0, null: false
      # t.datetime :current_sign_in_at
      # t.datetime :last_sign_in_at
      # t.string   :current_sign_in_ip
      # t.string   :last_sign_in_ip

      ## Confirmable (optional - uncomment if needed)
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable

      ## Lockable (optional - uncomment if needed)
      # t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end