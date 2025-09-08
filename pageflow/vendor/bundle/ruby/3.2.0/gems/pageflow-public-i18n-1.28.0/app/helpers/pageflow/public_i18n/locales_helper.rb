module Pageflow
  module PublicI18n
    module LocalesHelper
      def public_locale_name_for(locale)
        I18n.t('pageflow.public._language', locale: locale)
      end
    end
  end
end
