# frozen_string_literal: true

module Users
  class UserRegisterOp < ::Subroutine::Op
    string :email
    string :password
    string :password_confirmation
    string :first_name
    string :last_name
    string :time_zone

    validates :email, :password_confirmation, :first_name, :last_name, :time_zone, presence: true

    validates :password,
      presence: true,
      length: {in: User::VALID_PASSWORD_LENGTH},
      format: {with: User::VALID_PASSWORD_FORMAT}

    validate :validate_passwords_match

    outputs :user

    protected

    def perform
      op = UserCreateOp.new(params.merge(accepted_terms_at: Time.now))

      user = if op.submit
        op.user
      # send_user_confirmation_email!
      else
        inherit_errors op
      end

      output :user, user
    end

    private

    def validate_passwords_match
      return if password == password_confirmation

      errors.add(:base, "Password and Password Confirmation don't match")
    end
  end
end
