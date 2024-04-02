# frozen_string_literal: true

require "./test/test_helper"

module Authentication
  # jwt exchange test
  class JwtExchangeOpTest < OpTest
    let(:user) { User.first }

    def test_it_exchanges_a_valid_jwt_token_for_user
      token = Authentication::GenerateJwtTokenOp.submit!(user:).token
      refute token.nil?
      found_user = inferred_op_class.submit!(token:).user
      assert_equal user, found_user
    end

    def test_it_raises_when_invalid_token
      assert_raises JWT::DecodeError do
        inferred_op_class.submit!(token: "invalid")
      end
    end

    def test_it_raises_when_user_not_found
      token = Authentication::GenerateJwtTokenOp.submit!(user:).token
      User.destroy_all
      assert_raises ActiveRecord::RecordNotFound do
        inferred_op_class.submit!(token:)
      end
    end

    def test_it_raises_when_params_empty
      assert_raises "Token can't be blank" do
        inferred_op_class.submit!(token: nil)
      end
    end
  end
end
