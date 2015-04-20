require 'rails/generators'
module Partystreusel
  class StyleguideGenerator < ::Rails::Generators::Base
    source_root File.expand_path('../../../../', __FILE__)

    TARGET_DIR_FOR_STYLESHEETS = 'app/assets/stylesheets/'
    TARGET_DIR_FOR_STYLEGUIDE = 'app/views/styleguide'
    TARGET_DIR_FOR_PARTIALS = 'app/views/partials'


    def copy_stylesheets
      directory 'styleguide/source/stylesheets', TARGET_DIR_FOR_STYLESHEETS
    end

    def copy_views
      directory 'styleguide/source/styleguide', TARGET_DIR_FOR_STYLEGUIDE
      directory 'styleguide/source/partials', TARGET_DIR_FOR_PARTIALS
    end
  end
end
