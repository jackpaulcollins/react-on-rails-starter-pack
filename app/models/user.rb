# frozen_string_literal: true

# User model
class User < ApplicationRecord
  validates :email, uniqueness: true, presence: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :first_name, :last_name, :encrypted_password, presence: true
  validate :validate_time_zone

  VALID_PASSWORD_LENGTH = (8..25)
  VALID_PASSWORD_FORMAT = /\A
    (?=.{8,})          # Must contain 8 or more characters
    (?=.*\d)           # Must contain a digit
    (?=.*[a-z])        # Must contain a lower case character
    (?=.*[A-Z])        # Must contain an upper case character
    (?=.*[[:^alnum:]]) # Must contain a symbol
  /x

  def validate_time_zone
    ActiveSupport::TimeZone.find_tzinfo(time_zone)
    # recure here so we can call valid? without raising
  rescue TZInfo::InvalidTimezoneIdentifier
    errors.add(:time_zone, "is not a valid time zone")
    false
  end

  def generate_jwt_token
    ::Authentication::GenerateJwtTokenOp.submit!(user: self).token
  end

  def generate_jwt_refresh_token
    ::Authentication::GenerateJwtTokenOp.submit!(user: self, refresh: true).token
  end

  def authenticate(password)
    BCrypt::Password.new(encrypted_password) == password
  end
end
