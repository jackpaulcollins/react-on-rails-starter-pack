# frozen_string_literal: true

require "./test/test_helper"

module Authentication
  class LoginOpTest < OpTest
    let(:params) do
      {
        email: "test_user@gmail.com",
        password: "password"
      }
    end

    let(:user) { User.first }

    def test_it_raises_when_arguments_not_complete
      (assert_raises(Subroutine::Failure) { inferred_op_class.submit! })
    end

    def test_happy_path
      op_user = inferred_op_class.submit!(params).user
      assert_equal user, op_user
    end

    def test_it_raises_when_email_not_found
      assert_raises("invalid email or password") do
        inferred_op_class.submit!(params.except(:email).merge(email: "foo@bar.com"))
      end
    end

    def test_it_raises_when_password_incorrect
      assert_raises("invalid email or password") do
        inferred_op_class.submit!(params.except(:password).merge(password: "wrong_password"))
      end
    end
  end
end
