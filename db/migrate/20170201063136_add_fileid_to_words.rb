class AddFileidToWords < ActiveRecord::Migration[5.0]
  def change
    add_column :words, :fileid, :integer
  end
end
