module Partystreusel
  class StyleguideController < ApplicationController
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
