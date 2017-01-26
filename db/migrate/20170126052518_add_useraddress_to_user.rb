class AddUseraddressToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :Useraddress, :string
  end
end
