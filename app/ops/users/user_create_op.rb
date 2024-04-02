# frozen_string_literal: true

module Users
  # This operation creates a new user record in the database.
  class UserCreateOp < ::Subroutine::Op
    inputs_from UserRegisterOp

    outputs :user

    def perform
      user = build_user

      if user.valid?
        user.save!
        output :user, user
      else
        errors.add(:base, user.errors.full_messages.join(", "))
      end
    end

    private

    def build_user
      u = User.new(**params.except(:password, :password_confirmation))
      u.encrypted_password = hashed_password
      u
    end

    def hashed_password
      BCrypt::Password.create(password)
    end
  end
end
