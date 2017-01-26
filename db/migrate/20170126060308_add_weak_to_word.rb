class AddWeakToWord < ActiveRecord::Migration[5.0]
  def change
    add_column :words, :Weak, :boolean
  end
end
