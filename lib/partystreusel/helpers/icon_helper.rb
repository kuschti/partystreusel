module Partystreusel::Helpers::IconHelper

  def streusel_icon(name, classes = '')
    haml_tag :svg, xmlns: 'http://www.w3.org/2000/svg', title: "#{name}", class: "icon icon--#{name} #{classes}" do
      haml_tag :use, 'xlink:href' => "#icon--#{name}"
    end
  end

end
