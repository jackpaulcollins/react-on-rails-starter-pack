# frozen_string_literal: true

module Api
  module V1
    # Users controller
    class UsersController < ApplicationController
      def create
        op = Users::UserRegisterOp.new(params)

        if op.submit
          user = op.user
          render json: {user: UserSerializer.new(user).to_hash, token: user.generate_jwt_token}, status: :ok
        else
          render json: {errors: op.errors.full_messages}, status: :unprocessable_entity
        end
      end
    end
  end
end
