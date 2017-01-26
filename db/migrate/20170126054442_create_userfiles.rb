class CreateUserfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :userfiles do |t|
      t.references :user, foreign_key: true
      t.string :filename
      t.references :word, foreign_key: true

      t.timestamps
    end
    add_index :userfiles, [:user, :filename]
  end
end
