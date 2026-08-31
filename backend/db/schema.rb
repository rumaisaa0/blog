# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_260_831_095_823) do
  create_table 'active_storage_attachments', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness',
                                                    unique: true
  end

  create_table 'active_storage_blobs', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum', null: false
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci',
                                                 force: :cascade do |t|
    t.bigint 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

  create_table 'blog_contributors', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'blog_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'organization_id', default: 1, null: false
    t.index ['blog_id'], name: 'index_blog_contributors_on_blog_id'
    t.index ['organization_id'], name: 'index_blog_contributors_on_organization_id'
    t.index ['user_id'], name: 'index_blog_contributors_on_user_id'
  end

  create_table 'blog_edit_requests', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'blog_id', null: false
    t.bigint 'contributor_id', null: false
    t.bigint 'category_id', null: false
    t.string 'title'
    t.text 'content'
    t.string 'status', default: 'pending', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'organization_id', default: 1, null: false
    t.index ['blog_id'], name: 'index_blog_edit_requests_on_blog_id'
    t.index ['category_id'], name: 'index_blog_edit_requests_on_category_id'
    t.index ['contributor_id'], name: 'index_blog_edit_requests_on_contributor_id'
    t.index ['organization_id'], name: 'index_blog_edit_requests_on_organization_id'
  end

  create_table 'blogs', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'title'
    t.text 'content'
    t.bigint 'user_id', null: false
    t.bigint 'category_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'organization_id', default: 1, null: false
    t.index ['category_id'], name: 'index_blogs_on_category_id'
    t.index ['organization_id'], name: 'index_blogs_on_organization_id'
    t.index ['user_id'], name: 'index_blogs_on_user_id'
  end

  create_table 'categories', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name'
    t.bigint 'user_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'organization_id', default: 1, null: false
    t.index ['organization_id'], name: 'index_categories_on_organization_id'
    t.index ['user_id'], name: 'index_categories_on_user_id'
  end

  create_table 'comments', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.text 'content'
    t.bigint 'user_id', null: false
    t.string 'commentable_type', null: false
    t.bigint 'commentable_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.bigint 'organization_id', default: 1, null: false
    t.index %w[commentable_type commentable_id], name: 'index_comments_on_commentable'
    t.index ['organization_id'], name: 'index_comments_on_organization_id'
    t.index ['user_id'], name: 'index_comments_on_user_id'
  end

  create_table 'organizations', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name'
    t.string 'subdomain'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'users', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'email', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'jti'
    t.string 'role', default: 'registered'
    t.string 'username', null: false
    t.bigint 'organization_id', default: 1, null: false
    t.string 'confirmation_token'
    t.datetime 'confirmed_at'
    t.datetime 'confirmation_sent_at'
    t.string 'unconfirmed_email'
    t.index ['confirmation_token'], name: 'index_users_on_confirmation_token', unique: true
    t.index ['jti'], name: 'index_users_on_jti', unique: true
    t.index %w[organization_id email], name: 'index_users_on_organization_id_and_email', unique: true
    t.index %w[organization_id username], name: 'index_users_on_organization_id_and_username', unique: true
    t.index ['organization_id'], name: 'index_users_on_organization_id'
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'blog_contributors', 'blogs'
  add_foreign_key 'blog_contributors', 'organizations'
  add_foreign_key 'blog_contributors', 'users'
  add_foreign_key 'blog_edit_requests', 'blogs'
  add_foreign_key 'blog_edit_requests', 'categories'
  add_foreign_key 'blog_edit_requests', 'organizations'
  add_foreign_key 'blog_edit_requests', 'users', column: 'contributor_id'
  add_foreign_key 'blogs', 'categories'
  add_foreign_key 'blogs', 'organizations'
  add_foreign_key 'blogs', 'users'
  add_foreign_key 'categories', 'organizations'
  add_foreign_key 'categories', 'users'
  add_foreign_key 'comments', 'organizations'
  add_foreign_key 'comments', 'users'
  add_foreign_key 'users', 'organizations'
end
