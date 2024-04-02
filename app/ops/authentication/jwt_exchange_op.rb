# frozen_string_literal: true

module Authentication
  # exchanges a JWT token for a user record. expirations are handled in the controller
  class JwtExchangeOp < ::Subroutine::Op
    string :token
    outputs :user

    protected

    def perform
      claims = parsed_token(token).first

      user = find_user(claims["data"])

      output :user, user
    end

    def find_user(user_id)
      User.find(user_id)
    end

    def parsed_token(token)
      s = ENV["JWT_SECRET_KEY"]
      a = ENV["JWT_ALGORITHM"]

      JWT.decode(token, s, a)
    end
  end
end
