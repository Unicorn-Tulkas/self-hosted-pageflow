import { ThemeIcon, frontend } from 'pageflow-scrolled/frontend';
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

var styles = {"standAlone":"IconInlineFileRights-module_standAlone__15788","button":"IconInlineFileRights-module_button__o5ZmR","tooltip":"IconInlineFileRights-module_tooltip__2e1u8","transparent":"IconInlineFileRights-module_transparent__2dVaA","wrapper":"IconInlineFileRights-module_wrapper__2kQK_","scroller":"IconInlineFileRights-module_scroller__1hT8t"};

function IconInlineFileRights(_ref) {
  var _classNames;

  var context = _ref.context,
      playerControlsStandAlone = _ref.playerControlsStandAlone,
      playerControlsTransparent = _ref.playerControlsTransparent,
      children = _ref.children;

  if (context === 'afterElement') {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.wrapper, (_classNames = {}, _defineProperty(_classNames, styles.transparent, context !== 'playerControls' || playerControlsTransparent), _defineProperty(_classNames, styles.standAlone, context !== 'playerControls'), _classNames))
  }, /*#__PURE__*/React.createElement("button", {
    className: styles.button
  }, /*#__PURE__*/React.createElement(ThemeIcon, {
    name: "copyright"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.tooltip
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.scroller
  }, children)));
}

frontend.widgetTypes.register('iconInlineFileRights', {
  component: IconInlineFileRights
});
