class CreateReleaseFiles < ActiveRecord::Migration[5.0]
  def change
    create_table :release_files do |t|
      # t.references :userfiles, foreign_key: true
      t.string :userfiles_id
      t.string :filename
      t.string :description
      t.integer :popularity
      t.string :tag
      t.timestamps
    end
  end
end
