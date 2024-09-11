class Plan < ApplicationRecord
  belongs_to :user, foreign_key: :created_by_id

  validates :title, :created_by_id, presence: true
end
