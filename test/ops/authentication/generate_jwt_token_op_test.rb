# frozen_string_literal: true

require "./test/test_helper"

module Authentication
  # jwt generation test
  class GenerateJwtTokenOpTest < OpTest
    let(:user) { User.first }
    def test_it_generates_a_valid_jwt_token
      token = inferred_op_class.submit!(user:).token
      refute token.nil?
      found_user = ::Authentication::JwtExchangeOp.submit!(token:).user
      assert_equal user, found_user
    end

    def test_it_raises_when_user_is_nil
      assert_raises "User can't be blank" do
        inferred_op_class.submit!(user: nil)
      end
    end

    def test_token_expires_in_four_hours
      token = inferred_op_class.submit!(user:).token
      claims = JWT.decode(token, ENV["JWT_SECRET_KEY"], ENV["JWT_ALGORITHM"]).first
      assert_in_delta Time.now.to_i + 4 * 3600, claims["exp"], 1
    end
  end
end
