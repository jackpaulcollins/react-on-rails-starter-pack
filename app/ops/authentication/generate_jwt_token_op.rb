# frozen_string_literal: true

require "subroutine/association_fields"

module Authentication
  # generates a JWT token for a user.
  class GenerateJwtTokenOp < ::Subroutine::Op
    include ::Subroutine::AssociationFields
    association :user
    boolean :refresh, default: false
    outputs :token

    validates :user, presence: true

    protected

    def perform
      token = generate_jwt_token(user)
      output :token, token
    end

    private

    def generate_jwt_token(user)
      exp_payload = {data: user.id, exp: expiry_time}
      s = ENV["JWT_SECRET_KEY"]
      a = ENV["JWT_ALGORITHM"]
      JWT.encode exp_payload, s, a
    end

    def expiry_time
      refresh ? Time.now.to_i + 48 * 3600 : Time.now.to_i + 4 * 3600
    end
  end
end
