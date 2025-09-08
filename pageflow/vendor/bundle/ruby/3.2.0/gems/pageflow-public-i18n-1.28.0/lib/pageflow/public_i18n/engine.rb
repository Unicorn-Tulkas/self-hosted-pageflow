module Pageflow
  module PublicI18n
    class Engine < Rails::Engine
      isolate_namespace Pageflow::PublicI18n

      config.i18n.load_path += Dir[config.root.join('config', 'locales', '**', '*.yml').to_s]
    end
  end
end
