# frozen_string_literal: true

require "./test/test_helper"

module Users
  class UserRegisterOpTest < OpTest
    let(:params) do
      {
        email: "foo@bar.com",
        first_name: "Foo",
        last_name: "Bar",
        accepted_terms_at: Time.current,
        time_zone: "UTC",
        password: "Password123!",
        password_confirmation: "Password123!",
        confirmation_sent_at: Time.current,
        confirmation_token: "token",
        confirmed_at: Time.current
      }
    end

    def test_it_raises_when_arguments_not_complete
      assert_raises(Subroutine::Failure) { inferred_op_class.submit! }
    end

    def test_it_creates_user
      assert_changes -> { User.count }, 1 do
        inferred_op_class.submit!(params)
      end
    end

    def test_it_raises_when_password_and_confirmation_dont_match
      assert_raises("Password and Password Confirmation don't match") do
        inferred_op_class.submit!(params.merge(password_confirmation: "wrong"))
      end
    end

    def test_it_requires_valid_password
      ["a", "password", "password123", "PASSWORD123", "Password", "Password!", "password123!"].each do |password|
        assert_raises("Password is invalid") do
          inferred_op_class.submit!(params.merge(password:, password_confirmation: password))
        end
      end
    end
  end
end
