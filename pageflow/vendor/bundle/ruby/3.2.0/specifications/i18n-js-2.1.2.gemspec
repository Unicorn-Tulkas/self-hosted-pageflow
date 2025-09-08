# -*- encoding: utf-8 -*-
# stub: i18n-js 2.1.2 ruby lib

Gem::Specification.new do |s|
  s.name = "i18n-js".freeze
  s.version = "2.1.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Nando Vieira".freeze]
  s.date = "2011-11-18"
  s.description = "It's a small library to provide the Rails I18n translations on the Javascript.".freeze
  s.email = ["fnando.vieira@gmail.com".freeze]
  s.homepage = "http://rubygems.org/gems/i18n-js".freeze
  s.rubygems_version = "3.4.19".freeze
  s.summary = "It's a small library to provide the Rails I18n translations on the Javascript.".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 3

  s.add_runtime_dependency(%q<i18n>.freeze, [">= 0"])
  s.add_development_dependency(%q<fakeweb>.freeze, [">= 0"])
  s.add_development_dependency(%q<activesupport>.freeze, [">= 3.0.0"])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 2.6"])
  s.add_development_dependency(%q<spec-js>.freeze, ["~> 0.1.0.beta.0"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  s.add_development_dependency(%q<pry>.freeze, [">= 0"])
end
