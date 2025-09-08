# -*- encoding: utf-8 -*-
# stub: with_advisory_lock 4.6.0 ruby lib

Gem::Specification.new do |s|
  s.name = "with_advisory_lock".freeze
  s.version = "4.6.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Matthew McEachen".freeze]
  s.date = "2019-09-20"
  s.description = "Advisory locking for ActiveRecord".freeze
  s.email = ["matthew+github@mceachen.org".freeze]
  s.homepage = "https://github.com/mceachen/with_advisory_lock".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.10".freeze)
  s.rubygems_version = "3.4.19".freeze
  s.summary = "Advisory locking for ActiveRecord".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<activerecord>.freeze, [">= 4.2"])
  s.add_development_dependency(%q<yard>.freeze, [">= 0"])
  s.add_development_dependency(%q<minitest>.freeze, [">= 0"])
  s.add_development_dependency(%q<minitest-great_expectations>.freeze, [">= 0"])
  s.add_development_dependency(%q<minitest-reporters>.freeze, [">= 0"])
  s.add_development_dependency(%q<mocha>.freeze, [">= 0"])
  s.add_development_dependency(%q<appraisal>.freeze, [">= 0"])
end
