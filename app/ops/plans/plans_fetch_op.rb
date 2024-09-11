# frozen_string_literal: true

require 'subroutine/association_fields'

module Plans
  # fetches all plans for a user.
  class PlansFetchOp < ::Subroutine::Op
    include ::Subroutine::AssociationFields
    association :user
    outputs :plans

    def perform
      plans = user.plans
      output :plans, plans
    end
  end
end
