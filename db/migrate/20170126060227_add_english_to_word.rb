class AddEnglishToWord < ActiveRecord::Migration[5.0]
  def change
    add_column :words, :English, :string
  end
end
