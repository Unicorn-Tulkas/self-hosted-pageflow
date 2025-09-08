import React from 'react';
import { e as _objectWithoutProperties, u as useI18n } from './i18n-ce13a8bf.js';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
var EnterFullscreenIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "expand",
    className: (styles["svg-inline--fa"] || "svg-inline--fa") + " " + (styles["fa-expand"] || "fa-expand") + " " + (styles["fa-w-14"] || "fa-w-14"),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
  }));
});

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}
var ExitFullscreenIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$1({
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "compress",
    className: (styles["svg-inline--fa"] || "svg-inline--fa") + " " + (styles["fa-compress"] || "fa-compress") + " " + (styles["fa-w-14"] || "fa-w-14"),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 448 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"
  }));
});

var styles = {"button":"ToggleFullscreenButton-module_button__2n69- utils-module_unstyledButton__3rgne"};

function ToggleFullscreenButton(props) {
  var _useI18n = useI18n(),
      t = _useI18n.t;

  return /*#__PURE__*/React.createElement("button", {
    className: styles.button,
    title: t(props.isFullscreen ? 'exit_fullscreen' : 'enter_fullscreen', {
      scope: 'pageflow_scrolled.public'
    }),
    onClick: function onClick() {
      return props.isFullscreen ? props.onExit() : props.onEnter();
    }
  }, icon(props));
}

function icon(props) {
  if (props.isFullscreen) {
    return /*#__PURE__*/React.createElement(ExitFullscreenIcon, null);
  } else {
    return /*#__PURE__*/React.createElement(EnterFullscreenIcon, null);
  }
}

var styles$1 = {"corner":"ToggleFullscreenCornerButton-module_corner__CxAAH"};

function ToggleFullscreenCornerButton(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.corner
  }, /*#__PURE__*/React.createElement(ToggleFullscreenButton, props));
}

export { ToggleFullscreenCornerButton as T };
