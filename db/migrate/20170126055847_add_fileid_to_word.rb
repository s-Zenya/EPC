class AddFileidToWord < ActiveRecord::Migration[5.0]
  def change
    add_column :words, :Fileid, :integer
  end
end
