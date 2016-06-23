class CreateDots < ActiveRecord::Migration
  def change
    create_table :dots do |t|
      t.integer :x
      t.integer :y

      t.timestamps null: false
    end
  end
end
