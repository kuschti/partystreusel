module Partystreusel
  module Generators
    class StylesheetsGenerator < Rails::Generators::Base
      desc "Initializes Partystreusel Stylesheets"
      def create_stylesheets
        source_root File.expand_path("../styleguide/source/stylesheets", __FILE__)
      end
  end
end
