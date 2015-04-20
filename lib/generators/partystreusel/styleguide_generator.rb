require 'rails/generators'
module Partystreusel
  class StyleguideGenerator < ::Rails::Generators::Base
    source_root File.expand_path('../../../../', __FILE__)

    TARGET_DIR_FOR_STYLESHEETS = 'app/assets/stylesheets/partystreusel/'
    TARGET_DIR_FOR_VIEWS = 'app/views/styleguide'


    def copy_stylesheets
      directory 'styleguide/source/stylesheets', TARGET_DIR_FOR_STYLESHEETS
    end

    def copy_views

    end
  end
end
