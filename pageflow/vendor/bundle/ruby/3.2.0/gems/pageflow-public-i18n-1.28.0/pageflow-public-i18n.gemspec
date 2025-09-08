# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pageflow/public_i18n/version'

Gem::Specification.new do |spec|
  spec.name          = 'pageflow-public-i18n'
  spec.version       = Pageflow::PublicI18n::VERSION
  spec.authors       = ['Codevise Solutions Ltd.']
  spec.email         = ['info@codevise.de']

  spec.summary       = 'Shared translations for Pageflow plugins.'
  spec.homepage      = 'http://github.com/codevise/pageflow-public-i18n'

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end

  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 2.0'
  spec.add_development_dependency 'rake', '~> 13.0'
  spec.add_development_dependency 'localeapp', '~> 2.0'
end
