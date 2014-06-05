module Partystreusel::Helpers::ReadmoreHelper

  def readmore(*rest, &block)
    attrs = {}
    attrs = rest.shift if rest.last.is_a?(Hash)
    attrs.symbolize_keys!
    attrs[:data] ||= {}
    attrs[:data]['streusel-readmore'] = true
    haml_tag(:div, *rest, attrs, &block)
  end

end
