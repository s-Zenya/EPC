class CreateReleaseFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :release_files do |t|
      t.references :userfiles, foreign_key: true
      t.string :filename
      t.string :description
      t.integer :popularity

      t.timestamps
    end
  end
end
