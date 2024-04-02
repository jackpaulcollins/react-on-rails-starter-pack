# frozen_string_literal: true

require "./test/test_helper"

class UserTest < ActiveSupport::TestCase
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

  let(:unecessary_fields) { %i[accepted_terms_at confirmation_sent_at confirmation_token confirmed_at] }
  def test_validated_presence_fields_required
    params.each_pair do |field, _value|
      next if unecessary_fields.include?(field)

      user = User.new(params.except(field))
      refute user.valid?
      assert_equal true, user.errors[field].present?
      refute user.save
    end
  end

  def test_user_valid_with_all_fields
    user = User.new(params)
    assert user.valid?
    assert user.save
  end

  def test_email_uniqueness
    User.create(params)
    user = User.new(params)
    refute user.valid?
    assert_equal true, user.errors[:email].present?
    refute user.save
  end
end
