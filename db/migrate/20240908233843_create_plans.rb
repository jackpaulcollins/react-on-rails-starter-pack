class CreatePlans < ActiveRecord::Migration[7.0]
  def change
    create_table :plans do |t|
      t.string :title, null: false
      t.text :description
      t.integer :created_by_id, null: false

      t.timestamps
    end

    add_index :plans, :created_by_id
  end
end
