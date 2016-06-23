class AddColorToDot < ActiveRecord::Migration
  def change
    add_column :dots, :color, :string
  end
end
