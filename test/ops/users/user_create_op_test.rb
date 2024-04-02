# frozen_string_literal: true

require "./test/test_helper"

module Users
  class UserCreateOpTest < OpTest
    let(:params) do
      {
        email: "foo@bar.com",
        first_name: "Foo",
        last_name: "Bar",
        accepted_terms_at: Time.current,
        time_zone: "UTC",
        encrypted_password: "password",
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

    def test_it_encrypts_password # rubocop:disable Metrics/AbcSize
      user = inferred_op_class.submit!(params).user

      assert user.encrypted_password.present?
      refute_equal user.encrypted_password, params[:password]
      assert_equal BCrypt::Password.create(params[:password]), params[:password]
    end
  end
end
