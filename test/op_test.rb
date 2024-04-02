# frozen_string_literal: true

class OpTest < ActiveSupport::TestCase
  def inferred_op_class
    self.class.to_s[0..-5].constantize
  end
end
