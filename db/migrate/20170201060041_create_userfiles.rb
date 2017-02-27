class CreateUserfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :userfiles do |t|
      t.references :user, foreign_key: true
      t.string :filename

      t.timestamps
    end
      add_index :userfiles, [:id, :filename], unique: true
  end
end
