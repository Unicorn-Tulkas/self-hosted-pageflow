# -*- encoding: utf-8 -*-
# stub: wysihtml-rails 0.5.5 ruby lib

Gem::Specification.new do |s|
  s.name = "wysihtml-rails".freeze
  s.version = "0.5.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tanel Jakobsoo".freeze]
  s.date = "2016-01-06"
  s.description = "A wysiwyg text editor for Rails assets pipeline".freeze
  s.email = ["tanel@fraktal.ee".freeze]
  s.homepage = "https://github.com/Voog/wysihtml-rails".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.19".freeze
  s.summary = "Wysihtml (http://wysihtml.com) text editor for Rails assets pipeline.".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<railties>.freeze, [">= 3.1.0"])
  s.add_development_dependency(%q<bundler>.freeze, ["~> 1.3"])
  s.add_development_dependency(%q<rake>.freeze, ["~> 0"])
end
