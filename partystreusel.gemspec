# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "partystreusel/version"

Gem::Specification.new do |s|
  s.name        = "partystreusel"
  s.version     = Partystreusel::VERSION
  s.authors     = ["Flavio Pellanda"]
  s.email       = ["flavio.pellanda@screenconcetch"]
  s.homepage    = "http://www.screenconcept.ch"
  s.summary     = %q{A collection uf reusable javascript components by Screen Concept}
  s.description = %q{Contains sliders, accordions, expandable contents and any other component we deem worthy of joining this collection of awesomeness.}

  s.rubyforge_project = "partystreusel"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
end
