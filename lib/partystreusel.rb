if defined?(Rails)
  module Partystreusel
    module Rails
      class Engine < ::Rails::Engine
      end
    end
  end
end

require "partystreusel/version"
require "partystreusel/helpers"

if defined?(ActiveSupport) && ActiveSupport.respond_to?(:on_load)
  ActiveSupport.on_load(:action_view) do
    include Partystreusel::Helpers::ReadmoreHelper
    include Partystreusel::Helpers::IconHelper
  end
end
