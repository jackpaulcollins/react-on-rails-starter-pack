# frozen_string_literal: true

# Plan serializer
class PlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
end
