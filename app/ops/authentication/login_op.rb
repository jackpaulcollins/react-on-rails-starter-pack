# frozen_string_literal: true

require "subroutine/association_fields"

module Authentication
  # authenticates a user against the provided password
  class LoginOp < ::Subroutine::Op
    string :email
    string :password

    validates :email, presence: true
    outputs :user

    protected

    def perform
      user = User.find_by(email:)

      if user.present? && user.authenticate(password)
        output :user, user
      else
        errors.add(:base, "invalid email or password")
      end
    end
  end
end
