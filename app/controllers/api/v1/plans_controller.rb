# frozen_string_literal: true

module Api
  module V1
    # Plans controller
    class PlansController < ApplicationController
      before_action :authenticate_user!

      def index
        plans = Plans::PlansFetchOp.submit!(user_id: current_user.id).plans

        render json: plans, each_serializer: PlanSerializer, status: :ok
      end
    end
  end
end
