module Partystreusel
  class ApplicationController < ActionController::Base

  end
  class StyleguideController < ApplicationController
    layout 'partystreusel'
    def show
      template = File.join(params[:controller].gsub('partystreusel/',''), params[:page])
      render template
    rescue ActionView::MissingTemplate => e
      if e.message.include? "Missing template #{template}"
        raise ActionController::RoutingError, 'Not Found'
      else
        raise e
      end
    end
  end
end
