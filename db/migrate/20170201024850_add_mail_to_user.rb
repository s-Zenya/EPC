class AddMailToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :mail, :varchar
  end
end
