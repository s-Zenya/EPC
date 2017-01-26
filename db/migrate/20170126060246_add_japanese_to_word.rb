class AddJapaneseToWord < ActiveRecord::Migration[5.0]
  def change
    add_column :words, :Japanese, :string
  end
end
