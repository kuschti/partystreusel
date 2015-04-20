if defined?(Rails)
  module Partystreusel
    class Engine < ::Rails::Engine
      isolate_namespace Partystreusel

      initializer :assets do |config|
        Rails.application.config.assets.paths << root.join("styleguide", "source", "stylesheets")
      end

      if defined?(ActiveSupport) && ActiveSupport.respond_to?(:on_load)
        ActiveSupport.on_load(:action_view) do
          include Partystreusel::Helpers::ReadmoreHelper
          include Partystreusel::Helpers::IconHelper
        end
      end
    end
  end
end
