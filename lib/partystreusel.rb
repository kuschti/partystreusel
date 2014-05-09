module Partystreusel
  module Rails
    class Engine < ::Rails::Engine
    end
  end
end
require "partystreusel/version"
require "partystreusel/helpers"

if defined?(ActiveSupport)
  ActiveSupport.on_load(:action_view) do
    include Partystreusel::Helpers::ReadmoreHelper
  end
end
