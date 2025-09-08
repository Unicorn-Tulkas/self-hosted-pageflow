# -*- encoding: utf-8 -*-
# stub: ejs 1.1.1 ruby lib

Gem::Specification.new do |s|
  s.name = "ejs".freeze
  s.version = "1.1.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sam Stephenson".freeze]
  s.date = "2012-06-07"
  s.description = "Compile and evaluate EJS (Embedded JavaScript) templates from Ruby.".freeze
  s.email = ["sstephenson@gmail.com".freeze]
  s.homepage = "https://github.com/sstephenson/ruby-ejs/".freeze
  s.rubygems_version = "3.4.19".freeze
  s.summary = "EJS (Embedded JavaScript) template compiler".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 3

  s.add_development_dependency(%q<execjs>.freeze, ["~> 0.4"])
end
