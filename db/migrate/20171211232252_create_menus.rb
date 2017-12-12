class CreateMenus < ActiveRecord::Migration[5.1]
  def change
    create_table :menus do |t|
      t.string :dish
      t.float :price
      t.text :ingredient

      t.timestamps
    end
  end
end
