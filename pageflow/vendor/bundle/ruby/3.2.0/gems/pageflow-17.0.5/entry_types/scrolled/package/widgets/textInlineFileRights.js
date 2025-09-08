import { frontend } from 'pageflow-scrolled/frontend';
import React from 'react';
import classNames from 'classnames';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var styles = {"text":"TextInlineFileRights-module_text__1tT0W","forSection":"TextInlineFileRights-module_forSection__22xHD"};

function TextInlineFileRights(_ref) {
  var context = _ref.context,
      children = _ref.children;

  if (context === 'insideElement' || context === 'playerControls') {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.text, _defineProperty({}, styles.forSection, context === 'section'))
  }, /*#__PURE__*/React.createElement("div", null, children));
}

frontend.widgetTypes.register('textInlineFileRights', {
  component: TextInlineFileRights
});
