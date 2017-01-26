class AddUserpasswordToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :Userpassword, :string
  end
end
