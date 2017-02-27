# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170226055411) do

  create_table "release_files", force: :cascade do |t|
    t.integer  "userfiles_id"
    t.string   "filename"
    t.string   "description"
    t.integer  "popularity"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["userfiles_id"], name: "index_release_files_on_userfiles_id"
  end

  create_table "userfiles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "filename"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id", "filename"], name: "index_userfiles_on_id_and_filename", unique: true
    t.index ["user_id"], name: "index_userfiles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "name"
    t.string   "password"
    t.string   "address"
    t.string   "password_digest"
    t.index ["name"], name: "index_users_on_name", unique: true
  end

  create_table "words", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "English"
    t.string   "Japanese"
    t.boolean  "Weak"
    t.integer  "fileid"
  end

end
