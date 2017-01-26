class AddUsernameToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :Username, :string
  end
end
