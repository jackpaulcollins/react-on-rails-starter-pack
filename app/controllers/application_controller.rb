# frozen_string_literal: true

# app controller
class ApplicationController < ActionController::API
  attr_reader :current_user

  def authenticate_user!
    token = extract_token_from_header

    if token.present?
      user = Authentication::JwtExchangeOp.submit!(token:).user

      if user.present?
        @current_user = user
        return true
      end

      render json: {}, status: :unauthorized

    else
      render json: { message: 'token expired' }, status: :unauthorized
    end
  rescue JWT::ExpiredSignature
    render json: { message: 'token expired' }, status: :unauthorized
  end

  def extract_token_from_header
    authorization_header = request.headers['Authorization']

    return unless authorization_header&.match(/^Bearer /)

    authorization_header.sub(/^Bearer /, '')
  end
end
