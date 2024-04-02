# frozen_string_literal: true

module Api
  module V1
    # auth controller
    class AuthenticationController < ApplicationController
      include ActionController::Cookies

      def login
        op = Authentication::LoginOp.new(*params)

        if op.submit
          user = op.user
          token = user.generate_jwt_token
          refresh_token = user.generate_jwt_refresh_token

          render json: {user: UserSerializer.new(user).to_hash, token:, refresh_token:},
            status: :ok
        else
          render json: {errors: op.errors.full_messages}, status: :unauthorized
        end
      end

      def exchange
        token = extract_token_from_header

        if token.present?
          user = Authentication::JwtExchangeOp.submit!(token: extract_token_from_header).user

          if user.present?
            render json: {user: UserSerializer.new(user).to_hash}, status: :ok
          else
            render json: {}, status: :unauthorized
          end
        else
          render json: {message: "token expired"}, status: :unauthorized
        end
      rescue JWT::ExpiredSignature
        render json: {message: "token expired"}, status: :unauthorized
      end

      def refresh
        if params[:refresh_token].present?
          user = Authentication::JwtExchangeOp.submit!(token: params[:refresh_token]).user

          if user.present?
            token = user.generate_jwt_token

            render json: {user: UserSerializer.new(user).to_hash, token:},
              status: :ok
          else
            render json: {}, status: :unauthorized
          end
        else
          render json: {}, status: :unauthorized
        end
      end

      private

      def extract_token_from_header
        authorization_header = request.headers["Authorization"]

        return unless authorization_header&.match(/^Bearer /)

        authorization_header.sub(/^Bearer /, "")
      end
    end
  end
end
