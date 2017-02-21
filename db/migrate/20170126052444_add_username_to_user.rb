class AddnameToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string
  end
  add_index :users, :name, :unique => true
end
