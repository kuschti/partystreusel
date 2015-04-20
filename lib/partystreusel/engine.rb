if defined?(Rails)
  module Partystreusel
    class Engine < ::Rails::Engine
      isolate_namespace Partystreusel

      if defined?(ActiveSupport) && ActiveSupport.respond_to?(:on_load)
        ActiveSupport.on_load(:action_view) do
          include Partystreusel::Helpers::ReadmoreHelper
          include Partystreusel::Helpers::IconHelper
        end
      end
    end
  end
end
