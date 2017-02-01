class AddForeignKeyToUserfiles < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key(:userfiles, :users, options: 'ON UPDATE CASCADE ON DELETE CASCADE')
  end
end
