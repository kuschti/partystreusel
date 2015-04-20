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

    def add_route
      inject_into_file 'config/routes.rb', 'mount Partystreusel::Engine => "/"', after: /^end/
    end

    def copy_grunticon_files
      directory 'app/assets/images', 'app/assets/images'
      copy_file 'package.json', 'package.json'
      copy_file 'Gruntfile.coffee', 'Gruntfile.coffee'
    end
  end
end
