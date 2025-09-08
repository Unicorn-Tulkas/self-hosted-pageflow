import { useTheme, useI18n, utils, Tooltip, useFileRights, useLegalInfo, useCredits, Widget, ThemeIcon, useShareUrl, useMediaMuted, useOnUnmuteMedia, useChapters, useCurrentChapter, usePhonePlatform, useShareProviders, useScrollPosition, frontend } from 'pageflow-scrolled/frontend';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import classNames from 'classnames';
import { media } from 'pageflow/frontend';
import Measure from 'react-measure';

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var styles = {"breakpoint-below-md":"(max-width: 767px)","navigationBar":"DefaultNavigation-module_navigationBar__2RK0h scope-defaultNavigation","navigationBarExpanded":"DefaultNavigation-module_navigationBarExpanded__C3sLq","navigationBarContentWrapper":"DefaultNavigation-module_navigationBarContentWrapper__3narH","menuIcon":"DefaultNavigation-module_menuIcon__2bb8s","contextIcons":"DefaultNavigation-module_contextIcons__2e65s","contextIcon":"DefaultNavigation-module_contextIcon__ELsqa utils-module_unstyledButton__3rgne","logo":"DefaultNavigation-module_logo__3gUbx","chapterList":"DefaultNavigation-module_chapterList__3VoXX scope-defaultNavigationChapterList","chapterListItem":"DefaultNavigation-module_chapterListItem__1YF5e","navigationTooltip":"DefaultNavigation-module_navigationTooltip__26Fvn","progressBar":"DefaultNavigation-module_progressBar__1jvov","progressIndicator":"DefaultNavigation-module_progressIndicator__2d_e3","hasChapters":"DefaultNavigation-module_hasChapters__3ab-r","navigationChapters":"DefaultNavigation-module_navigationChapters__3M6zh","navigationChaptersHidden":"DefaultNavigation-module_navigationChaptersHidden__2TrUo"};

var styles$1 = {"breakpoint-md":"(min-width: 768px)","burgerMenuIconContainer":"HamburgerIcon-module_burgerMenuIconContainer__3aBkk","burgerMenuIcon":"HamburgerIcon-module_burgerMenuIcon__1WUV0","small":"HamburgerIcon-module_small__asAkY"};

var hamburgerIconStyles = {"hamburger":"HamburgerIcons-module_hamburger__SOreS","is-active":"HamburgerIcons-module_is-active__2jpzX","hamburger-inner":"HamburgerIcons-module_hamburger-inner__Wv7Dn","hamburger-box":"HamburgerIcons-module_hamburger-box__10MR1","hamburger--collapse":"HamburgerIcons-module_hamburger--collapse__1xOkf"};

function HamburgerIcon(props) {
  var theme = useTheme();

  var _useI18n = useI18n(),
      t = _useI18n.t;

  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.burgerMenuIconContainer
  }, /*#__PURE__*/React.createElement("button", {
    className: classNames(styles.menuIcon, styles$1.burgerMenuIcon, hamburgerIconStyles.hamburger, hamburgerIconStyles['hamburger--collapse'], _defineProperty({}, styles$1.small, theme.options.defaultNavigationMenuIconVariant === 'small'), _defineProperty({}, hamburgerIconStyles['is-active'], !props.mobileNavHidden)),
    title: props.mobileNavHidden ? t('pageflow_scrolled.public.navigation.open_mobile_menu') : t('pageflow_scrolled.public.navigation.close_mobile_menu'),
    type: "button",
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: hamburgerIconStyles['hamburger-box']
  }, /*#__PURE__*/React.createElement("span", {
    className: hamburgerIconStyles['hamburger-inner']
  }))));
}

var styles$2 = {"breakpoint-md":"(min-width: 768px)","chapterLink":"ChapterLink-module_chapterLink__3YspQ typography-defaultNavigationChapterLink","chapterLinkActive":"ChapterLink-module_chapterLinkActive__9i8SL typography-defaultNavigationActiveChapterLink","summary":"ChapterLink-module_summary__2ZfRU","tooltipBubble":"ChapterLink-module_tooltipBubble__3VRUO"};

var isBlank = utils.isBlank,
    presence = utils.presence;
function ChapterLink(props) {
  var _useI18n = useI18n(),
      t = _useI18n.t;

  var item = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: classNames(styles$2.chapterLink, _defineProperty({}, styles$2.chapterLinkActive, props.active)),
    href: "#".concat(props.chapterSlug),
    onClick: function onClick() {
      return props.handleMenuClick(props.chapterLinkId);
    }
  }, presence(props.title) || t('pageflow_scrolled.public.navigation.chapter', {
    number: props.chapterIndex
  })), !isBlank(props.summary) && /*#__PURE__*/React.createElement("p", {
    className: styles$2.summary,
    dangerouslySetInnerHTML: {
      __html: props.summary
    }
  }));

  if (isBlank(props.summary)) {
    return item;
  }

  var content = /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: props.summary
    }
  });
  return /*#__PURE__*/React.createElement(Tooltip, {
    content: content,
    openOnHover: true,
    highlight: true,
    bubbleClassName: styles$2.tooltipBubble
  }, item);
}

var styles$3 = {"legalInfoTooltip":"LegalInfoMenu-module_legalInfoTooltip__Qmf8u","scroller":"LegalInfoMenu-module_scroller__3NPW_","links":"LegalInfoMenu-module_links__1kpsd","separator":"LegalInfoMenu-module_separator__3mmjA","section":"LegalInfoMenu-module_section__1bLWD","legalInfoLink":"LegalInfoMenu-module_legalInfoLink__gkXaF","rights":"LegalInfoMenu-module_rights__-XGYO"};

function LegalInfoLink(props) {
  return /*#__PURE__*/React.createElement("div", null, props.label && props.url && /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noreferrer noopener",
    href: props.url,
    className: styles$3.legalInfoLink,
    dangerouslySetInnerHTML: {
      __html: props.label
    }
  }));
}

function LegalInfoMenu(props) {
  var fileRights = useFileRights();
  var legalInfo = useLegalInfo();
  var credits = useCredits();

  var _useI18n = useI18n(),
      t = _useI18n.t;

  var content = /*#__PURE__*/React.createElement("div", {
    className: styles$3.legalInfoTooltip
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.scroller
  }, credits && /*#__PURE__*/React.createElement("p", {
    className: styles$3.section,
    dangerouslySetInnerHTML: {
      __html: credits
    }
  }), fileRights.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: styles$3.section
  }, /*#__PURE__*/React.createElement("strong", null, t('pageflow_scrolled.public.media')), " ", renderFileRights(fileRights))), /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$3.links, _defineProperty({}, styles$3.separator, credits || fileRights.length > 0))
  }, /*#__PURE__*/React.createElement(LegalInfoLink, legalInfo.imprint), /*#__PURE__*/React.createElement(LegalInfoLink, legalInfo.copyright), /*#__PURE__*/React.createElement(LegalInfoLink, legalInfo.privacy)), /*#__PURE__*/React.createElement(Widget, {
    role: "creditsBoxFooter"
  }));
  return /*#__PURE__*/React.createElement(Tooltip, {
    horizontalOffset: props.tooltipOffset - 30,
    arrowPos: 120 - props.tooltipOffset,
    content: content
  }, /*#__PURE__*/React.createElement("button", {
    className: classNames(styles.contextIcon),
    "aria-haspopup": "true",
    title: t('pageflow_scrolled.public.navigation.legal_info')
  }, /*#__PURE__*/React.createElement(ThemeIcon, {
    name: "information"
  })));
}

function renderFileRights(items) {
  return /*#__PURE__*/React.createElement("ul", {
    className: styles$3.rights
  }, items.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, index > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, "\xA0| "), renderFileRightsText(item));
  }));
}

function renderFileRightsText(item) {
  if (item.urls.length > 1) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, item.text, " (", item.urls.flatMap(function (url, index) {
      return [index > 0 && ', ', /*#__PURE__*/React.createElement("a", {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        key: index
      }, index + 1)];
    }), ")");
  } else if (item.urls.length === 1) {
    return /*#__PURE__*/React.createElement("a", {
      href: item.urls[0],
      target: "_blank",
      rel: "noopener noreferrer"
    }, item.text);
  } else {
    return item.text;
  }
}

var styles$4 = {"sharingTooltip":"SharingMenu-module_sharingTooltip__2Tyev","shareLinkContainer":"SharingMenu-module_shareLinkContainer__3-3W6","shareLink":"SharingMenu-module_shareLink__3PdRE"};

function SharingMenu(_ref) {
  var shareProviders = _ref.shareProviders;
  var shareUrl = useShareUrl();

  var _useI18n = useI18n(),
      t = _useI18n.t;

  function renderShareLinks(shareProviders) {
    return shareProviders.map(function (shareProvider) {
      return /*#__PURE__*/React.createElement("div", {
        key: shareProvider.name,
        className: styles$4.shareLinkContainer
      }, /*#__PURE__*/React.createElement("a", {
        className: classNames('share', styles$4.shareLink),
        href: shareProvider.url.replace('%{url}', shareUrl),
        target: '_blank',
        rel: "noopener noreferrer"
      }, /*#__PURE__*/React.createElement(ThemeIcon, {
        name: shareProvider.iconName
      }), shareProvider.name));
    });
  }
  return /*#__PURE__*/React.createElement(Tooltip, {
    horizontalOffset: -70,
    arrowPos: 160,
    content: renderShareLinks(shareProviders)
  }, /*#__PURE__*/React.createElement("button", {
    className: classNames(styles.contextIcon),
    title: t('pageflow_scrolled.public.navigation.share')
  }, /*#__PURE__*/React.createElement(ThemeIcon, {
    name: "share"
  })));
}

var styles$5 = {"button":"ToggleMuteButton-module_button__1ACmo","animate":"ToggleMuteButton-module_animate__pd1yK","pulse":"ToggleMuteButton-module_pulse__2UN7Q"};

function ToggleMuteButton() {
  var muted = useMediaMuted();

  var _useI18n = useI18n(),
      t = _useI18n.t;

  useUnmuteSound();
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(_defineProperty({}, styles$5.animate, !muted))
  }, /*#__PURE__*/React.createElement("button", {
    className: classNames(styles.contextIcon, styles$5.button),
    title: muted ? t('pageflow_scrolled.public.navigation.unmute') : t('pageflow_scrolled.public.navigation.mute'),
    onClick: function onClick() {
      return media.mute(!muted);
    }
  }, muted ? /*#__PURE__*/React.createElement(ThemeIcon, {
    name: "muted"
  }) : /*#__PURE__*/React.createElement(ThemeIcon, {
    name: "unmuted"
  })));
}

function useUnmuteSound() {
  var theme = useTheme();
  var audio = useRef();
  useEffect(function () {
    audio.current = new Audio(theme.assets.unmute);
  }, [theme.assets.unmute]);
  useOnUnmuteMedia(useCallback(function () {
    return audio.current.play();
  }, []));
}

function Logo() {
  var theme = useTheme();
  return /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: theme.options.logoUrl,
    className: classNames(styles.menuIcon, styles.logo)
  }, /*#__PURE__*/React.createElement("picture", null, /*#__PURE__*/React.createElement("source", {
    media: "(max-width: 780px)",
    srcSet: theme.assets.logoMobile
  }), /*#__PURE__*/React.createElement("source", {
    media: "(min-width: 781px)",
    srcSet: theme.assets.logoDesktop
  }), /*#__PURE__*/React.createElement("img", {
    src: theme.assets.logoDesktop,
    alt: theme.options.logoAltText
  })));
}

var styles$6 = {"link":"SkipLinks-module_link__HMj9l"};

function SkipLinks() {
  var _useI18n = useI18n(),
      t = _useI18n.t;

  function scrollDown() {
    setTimeout(function () {
      window.scrollTo(0, 50);
    }, 50);
  }

  return /*#__PURE__*/React.createElement("div", {
    id: "skipLinks"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#goToContent",
    className: styles$6.link,
    onClick: scrollDown
  }, t('pageflow_scrolled.public.navigation_skip_links.content')));
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

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
var ChevronLeftIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
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
var ChevronRightIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
  }));
});

var styles$7 = {"button":"ScrollButton-module_button__1GKRF utils-module_unstyledButton__3rgne","visible":"ScrollButton-module_visible__29yco","start":"ScrollButton-module_start__1XPra ScrollButton-module_button__1GKRF utils-module_unstyledButton__3rgne","end":"ScrollButton-module_end__3PxQt ScrollButton-module_button__1GKRF utils-module_unstyledButton__3rgne"};

function ScrollButton(_ref) {
  var _classNames;

  var type = _ref.type,
      contentRect = _ref.contentRect,
      onStep = _ref.onStep;
  var visible = type === 'start' ? contentRect.scroll.left > 0 : contentRect.scroll.width > contentRect.client.width && contentRect.scroll.left < contentRect.scroll.width - contentRect.client.width;
  var step = type === 'start' ? -100 : 100;
  var interval = useRef();
  return /*#__PURE__*/React.createElement("button", {
    className: classNames((_classNames = {}, _defineProperty(_classNames, styles$7.start, type === 'start'), _defineProperty(_classNames, styles$7.end, type === 'end'), _defineProperty(_classNames, styles$7.visible, visible), _classNames)),
    onMouseDown: handleMouseDown,
    onKeyPress: handleKeyPress
  }, type === 'start' ? /*#__PURE__*/React.createElement(ChevronLeftIcon, null) : /*#__PURE__*/React.createElement(ChevronRightIcon, null));

  function handleMouseDown(event) {
    if (event.button === 0) {
      scrollUntilMouseUp();
    }
  }

  function scrollUntilMouseUp() {
    scrollStep();
    clearInterval(interval.current);
    interval.current = setInterval(function () {
      return scrollStep();
    }, 400);
    document.addEventListener('mouseup', stopScrolling);

    function stopScrolling() {
      document.removeEventListener('mouseup', stopScrolling);
      clearInterval(interval.current);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      scrollStep();
    }
  }

  function scrollStep() {
    onStep(step);
  }
}

var styles$8 = {"breakpoint-md":"(min-width: 768px)","scroller":"Scroller-module_scroller__139cK","inner":"Scroller-module_inner__3dhuM"};

function Scroller(_ref) {
  var children = _ref.children;
  var ref = useRef();
  return /*#__PURE__*/React.createElement(Measure, {
    scroll: true,
    client: true,
    innerRef: ref
  }, function (_ref2) {
    var contentRect = _ref2.contentRect,
        measureRef = _ref2.measureRef,
        measure = _ref2.measure;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollButton, {
      type: "start",
      contentRect: contentRect,
      onStep: scrollBy
    }), /*#__PURE__*/React.createElement(ScrollButton, {
      type: "end",
      contentRect: contentRect,
      onStep: scrollBy
    }), /*#__PURE__*/React.createElement("div", {
      className: styles$8.scroller,
      ref: measureRef,
      onFocus: scrollTargetIntoView,
      onScroll: function onScroll() {
        return measure();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles$8.inner
    }, children)));
  });

  function scrollBy(x) {
    // IE11 does not support scrollBy
    ref.current.scrollLeft = ref.current.scrollLeft + x;
  }

  function scrollTargetIntoView(event) {
    var targetBounds = event.target.getBoundingClientRect();
    var scrollerClipRight = ref.current.clientWidth * 0.75;
    var scrollerClipLeft = ref.current.clientWidth * 0.25;

    if (targetBounds.left < scrollerClipLeft) {
      scrollBy(targetBounds.left - scrollerClipLeft);
    } else if (targetBounds.right > scrollerClipRight) {
      scrollBy(targetBounds.right - scrollerClipRight);
    }
  }
}

function DefaultNavigation(_ref) {
  var _chapters$, _chapters$2, _classNames2;

  var configuration = _ref.configuration;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      navExpanded = _useState2[0],
      setNavExpanded = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      mobileNavHidden = _useState4[0],
      setMobileNavHidden = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      readingProgress = _useState6[0],
      setReadingProgress = _useState6[1];

  var chapters = useChapters();
  var currentChapter = useCurrentChapter();
  var isPhonePlatform = usePhonePlatform();
  var shareProviders = useShareProviders({
    isPhonePlatform: isPhonePlatform
  });
  var theme = useTheme();
  useScrollPosition(function (_ref2) {
    var prevPos = _ref2.prevPos,
        currPos = _ref2.currPos;
    var expand = currPos.y > prevPos.y || // Mobile Safari reports positive scroll position
    // during scroll bounce animation when scrolling
    // back to the top. Make sure navigation bar
    // stays expanded:
    currPos.y >= 0;
    if (expand !== navExpanded) setNavExpanded(expand);
  }, [navExpanded]);
  useScrollPosition(function (_ref3) {
    var prevPos = _ref3.prevPos,
        currPos = _ref3.currPos;
    var current = currPos.y * -1; // Todo: Memoize and update on window resize

    var total = document.body.clientHeight - window.innerHeight;
    var progress = Math.min(100, Math.abs(current / total) * 100);
    setReadingProgress(progress);
  }, [readingProgress], null, false, 1);
  useOnUnmuteMedia(useCallback(function () {
    return setNavExpanded(true);
  }, []));
  var hasChapters = chapters.length > 1 || !utils.isBlank((_chapters$ = chapters[0]) === null || _chapters$ === void 0 ? void 0 : _chapters$.title) || !utils.isBlank((_chapters$2 = chapters[0]) === null || _chapters$2 === void 0 ? void 0 : _chapters$2.summary);

  function handleProgressBarMouseEnter() {
    setNavExpanded(true);
  }

  function handleBurgerMenuClick() {
    setMobileNavHidden(!mobileNavHidden);
  }

  function handleMenuClick(chapterLinkId) {
    setMobileNavHidden(true);
  }

  function renderChapterLinks(chapters) {
    return chapters.map(function (chapter, index) {
      var chapterIndex = index + 1;
      var chapterLinkId = "chapterLink".concat(chapterIndex);
      return /*#__PURE__*/React.createElement("li", {
        key: index,
        className: styles.chapterListItem
      }, /*#__PURE__*/React.createElement(ChapterLink, Object.assign({}, chapter, {
        chapterIndex: chapterIndex,
        chapterLinkId: chapterLinkId,
        active: (currentChapter === null || currentChapter === void 0 ? void 0 : currentChapter.id) === chapter.id,
        handleMenuClick: handleMenuClick
      })));
    });
  }

  function renderNav() {
    if (!hasChapters) {
      return null;
    }

    return /*#__PURE__*/React.createElement(Scroller, null, /*#__PURE__*/React.createElement("nav", {
      className: classNames(styles.navigationChapters, _defineProperty({}, styles.navigationChaptersHidden, mobileNavHidden)),
      role: "navigation"
    }, /*#__PURE__*/React.createElement("ul", {
      className: styles.chapterList
    }, renderChapterLinks(chapters))));
  }

  var hideSharingButton = configuration.hideSharingButton || !shareProviders.length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: classNames(styles.navigationBar, (_classNames2 = {}, _defineProperty(_classNames2, styles.navigationBarExpanded, navExpanded || !isPhonePlatform && configuration.fixedOnDesktop || !mobileNavHidden), _defineProperty(_classNames2, styles.hasChapters, hasChapters), _classNames2))
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.navigationBarContentWrapper
  }, hasChapters && /*#__PURE__*/React.createElement(HamburgerIcon, {
    onClick: handleBurgerMenuClick,
    mobileNavHidden: mobileNavHidden
  }), /*#__PURE__*/React.createElement(SkipLinks, null), /*#__PURE__*/React.createElement(Logo, null), renderNav(), /*#__PURE__*/React.createElement("div", {
    className: classNames(styles.contextIcons)
  }, !configuration.hideToggleMuteButton && /*#__PURE__*/React.createElement(ToggleMuteButton, null), !theme.options.hideLegalInfoButton && /*#__PURE__*/React.createElement(LegalInfoMenu, {
    tooltipOffset: hideSharingButton ? -40 : 0
  }), !hideSharingButton && /*#__PURE__*/React.createElement(SharingMenu, {
    shareProviders: shareProviders
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.progressBar,
    onMouseEnter: handleProgressBarMouseEnter
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.progressIndicator,
    style: {
      width: readingProgress + '%'
    }
  }))), /*#__PURE__*/React.createElement(Widget, {
    role: "defaultNavigationExtra",
    props: {
      navigationExpanded: navExpanded,
      mobileNavigationVisible: !mobileNavHidden
    }
  }));
}

frontend.widgetTypes.register('defaultNavigation', {
  component: DefaultNavigation
});
