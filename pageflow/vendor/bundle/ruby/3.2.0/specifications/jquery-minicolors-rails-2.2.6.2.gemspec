# -*- encoding: utf-8 -*-
# stub: jquery-minicolors-rails 2.2.6.2 ruby lib

Gem::Specification.new do |s|
  s.name = "jquery-minicolors-rails".freeze
  s.version = "2.2.6.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Kostiantyn Kahanskyi".freeze]
  s.date = "2019-10-14"
  s.description = "This gem embeddes the jQuery colorpicker in the Rails asset pipeline.".freeze
  s.email = ["kostiantyn.kahanskyi@googlemail.com".freeze]
  s.homepage = "https://github.com/kostia/jquery-minicolors-rails".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.19".freeze
  s.summary = "This gem embeddes the jQuery colorpicker in the Rails asset pipeline.".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<rails>.freeze, [">= 3.2.8"])
  s.add_runtime_dependency(%q<jquery-rails>.freeze, [">= 0"])
  s.add_development_dependency(%q<multi_json>.freeze, [">= 0"])
  s.add_development_dependency(%q<pry>.freeze, [">= 0"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  s.add_development_dependency(%q<rspec-rails>.freeze, [">= 0"])
  s.add_development_dependency(%q<simple_form>.freeze, [">= 0"])
  s.add_development_dependency(%q<webrat>.freeze, [">= 0"])
end
