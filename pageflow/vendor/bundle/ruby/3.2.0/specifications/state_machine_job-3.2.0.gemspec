# -*- encoding: utf-8 -*-
# stub: state_machine_job 3.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "state_machine_job".freeze
  s.version = "3.2.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Codevise Solutions Ltd.".freeze]
  s.date = "2023-09-04"
  s.description = "State Machine + Active Job".freeze
  s.email = ["info@codevise.de".freeze]
  s.homepage = "http://github.com/codevise/state_machine_job".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.4.19".freeze
  s.summary = "Trigger jobs via Rails state machines.".freeze

  s.installed_by_version = "3.4.19" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_development_dependency(%q<state_machines-activemodel>.freeze, ["~> 0.9.0"])
  s.add_development_dependency(%q<bundler>.freeze, [">= 1.3", "< 3"])
  s.add_development_dependency(%q<rake>.freeze, ["< 14"])
  s.add_development_dependency(%q<rspec-rails>.freeze, ["~> 6.0"])
  s.add_development_dependency(%q<semmy>.freeze, ["~> 1.0"])
  s.add_development_dependency(%q<timecop>.freeze, ["~> 0.9.1"])
  s.add_runtime_dependency(%q<activejob>.freeze, [">= 4.2", "< 8"])
  s.add_runtime_dependency(%q<state_machines>.freeze, [">= 0.5", "< 0.7"])
end
