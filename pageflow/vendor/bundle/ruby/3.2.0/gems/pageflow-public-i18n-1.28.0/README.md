# Pageflow Public I18n

A shared library of translations to be used in published Pageflow
entries.

## Installation

This gem is not supposed to be installed directly into Pageflow
applications. It can instead be used as a dependency of Pageflow
plugin gems.

## Rationale

This gem is supposed to make adding new available locales for
published Pageflows easy. When adding a new language, instead of
having to make changes to all Pageflow plugin gems that contribute ui
elements to published Pageflows, the additional translations only need
to be added to this gem.

Whenever a Pageflow plugin needs a translation for a new string, it
can be added to this gem in a new minor version. The plugin can then
depend that version to ensure the translation is present.

## Usage

Make the gem a dependency of you Pageflow plugin:

    spec.add_dependency 'pageflow-public-i18n', '~> 1.0'

Start using translations from the `pageflow.public` namespace:

    I18n.t('pageflow.public.close')

## Contributing Locales

Edit the translations directly on the
[pageflow-public-i18n](http://www.localeapp.com/projects/public?search=tf/pageflow-public-i18n)
Localeapp project.
