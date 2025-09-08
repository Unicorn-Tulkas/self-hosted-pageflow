import 'regenerator-runtime';
import { E as EventContextDataProvider, C as ConnectedSection, u as usePrevious, g as getEventObject, w as withInlineEditingDecorator, a as useCurrentSectionIndexState, b as usePostMessageListener, c as contentStyles, A as AtmoProvider, S as ScrollToSectionContext, W as Widget, _ as _asyncToGenerator, d as _regeneratorRuntime, e as withInlineEditingAlternative, f as useDarkBackground, i as isBlankEditableTextValue, h as EditableText, j as useContentElementConfigurationUpdate, k as useContentElementAttributes, l as widths, I as InlineFileRights, m as useTextTracks, n as useMediaMuted, o as useFocusOutlineVisible, p as useVideoQualitySetting, q as useIsomorphicLayoutEffect, r as frontendStyles, s as useFullscreenDimensions, t as information, v as camelize, x as isBlank, y as presence, z as styles$a, R as RootProviders, B as registerVendors, D as api, F as loadInlineEditingComponents } from './EditableInlineText.module-ebd22921.js';
export { a8 as Atmo, a9 as AtmoContext, A as AtmoProvider, a6 as AudioPlayer, h as EditableText, $ as Image, I as InlineFileRights, a1 as MediaPlayer, O as PhonePlatformProvider, P as PlayerEventContextDataProvider, R as RootProviders, ad as SectionThumbnail, ac as StandaloneSectionThumbnail, a0 as Text, Q as ThirdPartyOptIn, T as ThirdPartyOptOutInfo, a5 as VideoPlayer, W as Widget, Z as contentElementWidthName, l as contentElementWidths, D as frontend, X as getAvailableTransitionNames, a2 as getInitialPlayerState, V as getTransitionNames, Y as paletteColor, a3 as playerStateReducer, a7 as processSources, B as registerConsentVendors, aa as useAtmo, G as useAudioFocus, U as useConsentRequested, j as useContentElementConfigurationUpdate, H as useContentElementEditorCommandSubscription, J as useContentElementLifecycle, K as useCurrentChapter, f as useDarkBackground, L as useIsStaticPreview, n as useMediaMuted, ab as useOnScreen, M as useOnUnmuteMedia, a4 as usePlayerState, N as usePortraitOrientation } from './EditableInlineText.module-ebd22921.js';
import 'core-js/modules/es.symbol';
import 'core-js/modules/es.symbol.description';
import 'core-js/modules/es.symbol.async-iterator';
import 'core-js/modules/es.symbol.has-instance';
import 'core-js/modules/es.symbol.is-concat-spreadable';
import 'core-js/modules/es.symbol.iterator';
import 'core-js/modules/es.symbol.match';
import 'core-js/modules/es.symbol.replace';
import 'core-js/modules/es.symbol.search';
import 'core-js/modules/es.symbol.species';
import 'core-js/modules/es.symbol.split';
import 'core-js/modules/es.symbol.to-primitive';
import 'core-js/modules/es.symbol.to-string-tag';
import 'core-js/modules/es.symbol.unscopables';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.fill';
import 'core-js/modules/es.array.find';
import 'core-js/modules/es.array.from';
import 'core-js/modules/es.json.to-string-tag';
import 'core-js/modules/es.map';
import 'core-js/modules/es.math.to-string-tag';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.promise.finally';
import 'core-js/modules/es.set';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/es.string.starts-with';
import 'core-js/modules/esnext.aggregate-error';
import 'core-js/modules/esnext.map.delete-all';
import 'core-js/modules/esnext.map.every';
import 'core-js/modules/esnext.map.filter';
import 'core-js/modules/esnext.map.find';
import 'core-js/modules/esnext.map.find-key';
import 'core-js/modules/esnext.map.from';
import 'core-js/modules/esnext.map.group-by';
import 'core-js/modules/esnext.map.includes';
import 'core-js/modules/esnext.map.key-by';
import 'core-js/modules/esnext.map.key-of';
import 'core-js/modules/esnext.map.map-keys';
import 'core-js/modules/esnext.map.map-values';
import 'core-js/modules/esnext.map.merge';
import 'core-js/modules/esnext.map.of';
import 'core-js/modules/esnext.map.reduce';
import 'core-js/modules/esnext.map.some';
import 'core-js/modules/esnext.map.update';
import 'core-js/modules/esnext.promise.all-settled';
import 'core-js/modules/esnext.promise.any';
import 'core-js/modules/esnext.promise.try';
import 'core-js/modules/esnext.set.add-all';
import 'core-js/modules/esnext.set.delete-all';
import 'core-js/modules/esnext.set.difference';
import 'core-js/modules/esnext.set.every';
import 'core-js/modules/esnext.set.filter';
import 'core-js/modules/esnext.set.find';
import 'core-js/modules/esnext.set.from';
import 'core-js/modules/esnext.set.intersection';
import 'core-js/modules/esnext.set.is-disjoint-from';
import 'core-js/modules/esnext.set.is-subset-of';
import 'core-js/modules/esnext.set.is-superset-of';
import 'core-js/modules/esnext.set.join';
import 'core-js/modules/esnext.set.map';
import 'core-js/modules/esnext.set.of';
import 'core-js/modules/esnext.set.reduce';
import 'core-js/modules/esnext.set.some';
import 'core-js/modules/esnext.set.symmetric-difference';
import 'core-js/modules/esnext.set.union';
import 'core-js/modules/esnext.symbol.dispose';
import 'core-js/modules/esnext.symbol.observable';
import 'core-js/modules/esnext.symbol.pattern-match';
import 'core-js/modules/web.dom-collections.iterator';
import 'regenerator-runtime/runtime.js';
import { browser, events, consent, features } from 'pageflow/frontend';
import React, { useRef, useState, useEffect, useCallback, useMemo, Suspense, useContext } from 'react';
import ReactDOM from 'react-dom';
import { _ as _slicedToArray, l as useSectionsWithChapter, r as useEntryStructure, s as getFileUrlTemplateHost, u as useI18n, b as _defineProperty, a as _objectSpread2, e as _objectWithoutProperties, g as useTheme, n as _toConsumableArray, t as useAvailableQualities, v as setupI18n } from './i18n-ce13a8bf.js';
export { L as LocaleProvider, v as setupI18n, k as useAdditionalSeedData, w as useChapters, x as useCredits, p as useEntryStateDispatch, i as useFile, y as useFileRights, h as useFileWithInlineRights, u as useI18n, z as useLegalInfo, C as useLocale, A as useShareProviders, B as useShareUrl, g as useTheme } from './i18n-ce13a8bf.js';
import classNames from 'classnames';
import { a as useContentElementEditorState } from './useContentElementEditorState-4f4c3cf6.js';
export { a as useContentElementEditorState } from './useContentElementEditorState-4f4c3cf6.js';
import './createSuper-d0f30da3.js';
import 'backbone-events-standalone';
import 'use-context-selector';
import 'reselect';
import 'slugify';
import 'i18n-js';
import 'striptags';
import Measure from 'react-measure';
import './PhonePlatformContext-4ec6b2de.js';
import { DraggableCore } from 'react-draggable';
export { T as ToggleFullscreenCornerButton } from './ToggleFullscreenCornerButton-b79159cc.js';
export { F as FullscreenViewer } from './index-11f32f10.js';
import { A as ArrowRightIcon, a as ArrowLeftIcon } from './arrowRight-62998af9.js';
export { u as usePhonePlatform } from './arrowRight-62998af9.js';
import invert from 'invert-color';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// Make sure Webpack loads chunks via asset host.
// Free variable assignment will be rewritten during Webpack compilation.
// See https://v4.webpack.js.org/guides/public-path/#on-the-fly
// PageflowScrolled::WebpackPublicPathHelper generates js snippet
// that defines the global. For Storybook, we set it to an empty default.
// eslint-disable-next-line no-undef
__webpack_public_path__ = commonjsGlobal.__webpack_public_path__ || '';

// iframes. Use polyfill instead.

if (browser.agent.matchesSafari() && window.parent !== window) {
  delete window.IntersectionObserver;
}

require('intersection-observer'); // Make sure we're in a Browser-like environment before importing polyfills
// This prevents `fetch()` from being imported in a Node test environment


if (typeof window !== 'undefined') {
  require('whatwg-fetch');

  require('scroll-timeline');
}

function Chapter(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: props.chapterSlug
  }, renderSections(props.sections, props.currentSectionIndex, props.setCurrentSection, props.scrollTargetSectionIndex, props.setScrollTargetSectionIndex));
}

function renderSections(sections, currentSectionIndex, setCurrentSection, scrollTargetSectionIndex, setScrollTargetSectionIndex) {
  function _onActivate(section) {
    setCurrentSection(section);
    setScrollTargetSectionIndex(null);
  }

  return sections.map(function (section) {
    return /*#__PURE__*/React.createElement(EventContextDataProvider, {
      key: section.permaId,
      section: section,
      sectionsCount: sections.length
    }, /*#__PURE__*/React.createElement(ConnectedSection, {
      state: section.sectionIndex > currentSectionIndex ? 'below' : section.sectionIndex < currentSectionIndex ? 'above' : 'active',
      isScrollTarget: section.sectionIndex === scrollTargetSectionIndex,
      onActivate: function onActivate() {
        return _onActivate(section);
      },
      section: section
    }));
  });
}

// initial viewport as 100vh. Once the page is scrolled, browser
// toolbars are hidden, the viewport becomes larger and elements with
// height 100vh no longer cover the viewport.
//
// To detect this situation, this component compares the height of a
// 100vh div with the inner height of the window on resize. Once those
// window height exceeds probe heights the component sets the `--vh`
// custom property (which default to 1vh) to a pixel value such that
// `calc(100 * var(--vh))` equals the inner height of the window.
//
// To prevent changing element sizes once the browser toolbars are
// shown again (when the user scrolls back up), `--vh` is not updated
// when the inner height of the window decreases slightly.
//
// On orientation change, we do want to update `--vh`, though. We
// therefore do update it when the inner height of the window
// decreases by more than 30%.

function VhFix(_ref) {
  var children = _ref.children;
  var probeRef = useRef();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  useEffect(function () {
    if (!browser.has('ios platform')) {
      return;
    }

    window.addEventListener('resize', update);
    return function () {
      return window.removeEventListener('resize', update);
    };

    function update() {
      setHeight(function (previousHeight) {
        return getHeight({
          windowHeight: window.innerHeight,
          probeHeight: probeRef.current.clientHeight,
          previousHeight: previousHeight
        });
      });
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: height && {
      '--vh': "".concat(height / 100, "px")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100vh',
      position: 'absolute'
    },
    ref: probeRef
  }), children);
}
function getHeight(_ref2) {
  var windowHeight = _ref2.windowHeight,
      probeHeight = _ref2.probeHeight,
      previousHeight = _ref2.previousHeight;

  if (probeHeight < windowHeight || previousHeight) {
    if (!previousHeight || windowHeight > previousHeight || windowHeight < previousHeight * 0.7) {
      return windowHeight;
    } else {
      return previousHeight;
    }
  }
}

function useSectionChangeEvents(currentSectionIndex) {
  var previousSectionIndex = usePrevious(currentSectionIndex);
  var sections = useSectionsWithChapter();
  useEffect(function () {
    if (previousSectionIndex !== currentSectionIndex) {
      events.trigger('page:change', getEventObject({
        section: sections[currentSectionIndex],
        sectionsCount: sections.length
      }));
    }
  });
}

var sectionChangeMessagePoster = function sectionChangeMessagePoster(index) {
  if (window.parent !== window) {
    window.parent.postMessage({
      type: 'CHANGE_SECTION',
      payload: {
        index: index
      }
    }, window.location.origin);
  }
};

var Content = withInlineEditingDecorator('ContentDecorator', function Content(props) {
  var _useCurrentSectionInd = useCurrentSectionIndexState(),
      _useCurrentSectionInd2 = _slicedToArray(_useCurrentSectionInd, 2),
      currentSectionIndex = _useCurrentSectionInd2[0],
      setCurrentSectionIndexState = _useCurrentSectionInd2[1];

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      scrollTargetSectionIndex = _useState2[0],
      setScrollTargetSectionIndex = _useState2[1];

  var entryStructure = useEntryStructure();
  useSectionChangeEvents(currentSectionIndex);

  var updateChapterSlug = function updateChapterSlug(section) {
    if (window.history && window.history.replaceState) {
      if (section.sectionIndex > 0) {
        window.history.replaceState(null, null, '#' + section.chapter.chapterSlug);
      } else {
        window.history.replaceState(null, null, window.location.href.split('#')[0]);
      }
    }
  };

  var setCurrentSection = useCallback(function (section) {
    sectionChangeMessagePoster(section.sectionIndex);
    setCurrentSectionIndexState(section.sectionIndex);
    updateChapterSlug(section);
  }, [setCurrentSectionIndexState]);
  var receiveMessage = useCallback(function (data) {
    if (data.type === 'SCROLL_TO_SECTION') {
      setScrollTargetSectionIndex(data.payload.index);
    }
  }, []);
  usePostMessageListener(receiveMessage);

  function scrollToSection(index) {
    if (index === 'next') {
      index = currentSectionIndex + 1;
    }

    setScrollTargetSectionIndex(index);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: contentStyles.Content,
    id: "goToContent"
  }, /*#__PURE__*/React.createElement(VhFix, null, /*#__PURE__*/React.createElement(AtmoProvider, null, /*#__PURE__*/React.createElement(ScrollToSectionContext.Provider, {
    value: scrollToSection
  }, renderChapters(entryStructure, currentSectionIndex, setCurrentSection, scrollTargetSectionIndex, setScrollTargetSectionIndex)))));
});

function renderChapters(entryStructure, currentSectionIndex, setCurrentSection, scrollTargetSectionIndex, setScrollTargetSectionIndex) {
  return entryStructure.map(function (chapter, index) {
    return /*#__PURE__*/React.createElement(Chapter, {
      key: index,
      chapterSlug: chapter.chapterSlug,
      permaId: chapter.permaId,
      sections: chapter.sections,
      currentSectionIndex: currentSectionIndex,
      setCurrentSection: setCurrentSection,
      scrollTargetSectionIndex: scrollTargetSectionIndex,
      setScrollTargetSectionIndex: setScrollTargetSectionIndex
    });
  });
}

function Entry() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Widget, {
    role: "consent"
  }), /*#__PURE__*/React.createElement(Widget, {
    role: "header"
  }), /*#__PURE__*/React.createElement(Content, null), /*#__PURE__*/React.createElement(Widget, {
    role: "footer"
  }));
}

function loadDashUnlessHlsSupported(_x) {
  return _loadDashUnlessHlsSupported.apply(this, arguments);
}

function _loadDashUnlessHlsSupported() {
  _loadDashUnlessHlsSupported = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(seed) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (hasHlsSupport({
              seed: seed,
              agent: browser.agent
            })) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return import('@videojs/http-streaming');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadDashUnlessHlsSupported.apply(this, arguments);
}

function hasHlsSupport(_ref) {
  var agent = _ref.agent,
      seed = _ref.seed;
  return agent.matchesSafari() || agent.matchesMobilePlatform() && (!agent.matchesAndroid() || hlsHostSupportedByAndroid(seed));
}

function hlsHostSupportedByAndroid(seed) {
  return getFileUrlTemplateHost(seed, 'videoFiles', 'hls-playlist').indexOf('_') < 0;
}

var ActionButton = withInlineEditingAlternative('ActionButton', function ActionButton() {
  return null;
});

var styles = {"darkContentSurfaceColor":"var(--theme-dark-content-surface-color, #101010)","lightContentSurfaceColor":"var(--theme-light-content-surface-color, #fff)","darkContentTextColor":"var(--theme-dark-content-text-color, #222)","lightContentTextColor":"var(--theme-light-content-text-color, #fff)","contentColorScope":"colors-module_contentColorScope__2Zizr","contentLinkColor":"var(--content-link-color)","root":"Figure-module_root__3FC-x colors-module_contentColorScope__2Zizr","invert":"Figure-module_invert___0BJP"};

/**
 * Render a figure with a caption text attached.
 *
 * @param {Object} props
 * @param {string} props.children - Content of figure.
 * @param {Object[]|string} props.caption - Formatted text data as provided by onCaptionChange.
 * @param {Function} props.onCaptionChange - Receives updated value when it changes.
 * @param {boolean} [props.addCaptionButtonVisible=true] - Control visiblility of action button.
 * @param {string} [props.captionButtonPosition='outside'] - Position of action button.
 */

function Figure(_ref) {
  var children = _ref.children,
      caption = _ref.caption,
      onCaptionChange = _ref.onCaptionChange,
      _ref$addCaptionButton = _ref.addCaptionButtonVisible,
      addCaptionButtonVisible = _ref$addCaptionButton === void 0 ? true : _ref$addCaptionButton,
      _ref$addCaptionButton2 = _ref.addCaptionButtonPosition,
      addCaptionButtonPosition = _ref$addCaptionButton2 === void 0 ? 'outside' : _ref$addCaptionButton2;
  var darkBackground = useDarkBackground();

  var _useContentElementEdi = useContentElementEditorState(),
      isSelected = _useContentElementEdi.isSelected,
      isEditable = _useContentElementEdi.isEditable;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEditingCaption = _useState2[0],
      setIsEditingCaption = _useState2[1];

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  caption = useMemo(function () {
    return typeof caption === 'string' ? [{
      type: 'paragraph',
      children: [{
        text: caption
      }]
    }] : caption;
  }, [caption]);

  if (!isBlankEditableTextValue(caption) || isEditable) {
    return /*#__PURE__*/React.createElement("figure", {
      className: classNames(styles.root, _defineProperty({}, styles.invert, !darkBackground))
    }, children, isBlankEditableTextValue(caption) && isSelected && !isEditingCaption && addCaptionButtonVisible && /*#__PURE__*/React.createElement(ActionButton, {
      position: addCaptionButtonPosition,
      icon: "pencil",
      text: t('pageflow_scrolled.inline_editing.add_caption'),
      onClick: function onClick() {
        return setIsEditingCaption(true);
      }
    }), (!isBlankEditableTextValue(caption) || isEditingCaption) && /*#__PURE__*/React.createElement("figcaption", {
      onBlur: function onBlur() {
        return setIsEditingCaption(false);
      }
    }, /*#__PURE__*/React.createElement(EditableText, {
      autoFocus: isEditingCaption,
      value: caption,
      scaleCategory: "caption",
      onChange: onCaptionChange,
      onlyParagraphs: true,
      hyphens: "none",
      floatingControlsPosition: "above",
      placeholder: t('pageflow_scrolled.inline_editing.type_text')
    })));
  } else {
    return children;
  }
}

var styles$1 = {"wrapper":"ContentElementBox-module_wrapper__3wZgP"};

/**
 * Wrap content element that render a visible box in this component to
 * apply theme specific styles like rounded corners.
 *
 * @param {Object} props
 * @param {string} props.children - Content of box.
 */

function ContentElementBox(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.wrapper
  }, children);
}

/**
 * @param {Object} props
 * @param {Object} props.configuration - Configuration of the content element.
 * @param {string} props.children - Content of box.
 */

function ContentElementFigure(_ref) {
  var configuration = _ref.configuration,
      children = _ref.children;
  var updateConfiguration = useContentElementConfigurationUpdate();

  var _useContentElementAtt = useContentElementAttributes(),
      width = _useContentElementAtt.width;

  return /*#__PURE__*/React.createElement(Figure, {
    caption: configuration.caption,
    onCaptionChange: function onCaptionChange(caption) {
      return updateConfiguration({
        caption: caption
      });
    },
    addCaptionButtonPosition: width === widths.full ? 'outsideIndented' : 'outside'
  }, children);
}

function MediaInteractionTracking(_ref) {
  var playerState = _ref.playerState,
      playerActions = _ref.playerActions,
      idleDelay = _ref.idleDelay,
      children = _ref.children;
  var hideControlsTimeout = useRef();
  var wasPlaying = usePrevious(playerState.isPlaying);
  var focusWasInside = usePrevious(playerState.focusInsideControls);
  var setHideControlsTimeout = useCallback(function () {
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(playerActions.userIdle, idleDelay);
  }, [playerActions.userIdle, idleDelay]);
  useEffect(function () {
    if (!wasPlaying && playerState.isPlaying || focusWasInside !== playerState.focusInsideControls) {
      setHideControlsTimeout();
    }
  }, [wasPlaying, playerState.isPlaying, setHideControlsTimeout, playerState.focusInsideControls, focusWasInside]);
  useEffect(function () {
    return function () {
      return clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  var handleInteraction = function handleInteraction() {
    playerActions.userInteraction();
    setHideControlsTimeout();
  };

  return /*#__PURE__*/React.createElement("div", {
    onClick: handleInteraction,
    onMouseMove: handleInteraction,
    onMouseEnter: playerActions.mouseEntered,
    onMouseLeave: playerActions.mouseLeft
  }, children);
}
MediaInteractionTracking.defaultProps = {
  idleDelay: 2000
};

function RemotePeakData(_ref) {
  var audioFile = _ref.audioFile,
      children = _ref.children;
  var peakDataUrl = audioFile === null || audioFile === void 0 ? void 0 : audioFile.urls.peakData;

  var _useState = useState('pending'),
      _useState2 = _slicedToArray(_useState, 2),
      peakData = _useState2[0],
      setPeakData = _useState2[1];

  useEffect(function () {
    if (peakDataUrl) {
      fetch(peakDataUrl).then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error ".concat(response.status, " while loading peaks."));
        }

        return response.json();
      }).then(function (peaks) {
        setPeakData(peaks.data);
      });
    } else {
      setPeakData(null);
    }
  }, [peakDataUrl]);

  if (peakData === 'pending') {
    return null;
  } else {
    return children(peakData);
  }
}

var styles$2 = {"container":"Waveform-module_container__1Dxdv","clickMask":"Waveform-module_clickMask__3LYAT","menuBar":"Waveform-module_menuBar__342n-","menuBarInner":"Waveform-module_menuBarInner__3wjQs","timeDisplay":"Waveform-module_timeDisplay__1v4Tl","playControl":"Waveform-module_playControl__QWTsJ","waveWrapper":"Waveform-module_waveWrapper__3gamc"};

var waveColor = '#828282ed';
var waveColorInverted = 'rgba(0, 0, 0, 0.5)';
var cursorColor = '#fff';
var cursorColorInverted = '#888';
var Wavesurfer = React.lazy(function () {
  return import('./Wavesurfer-7d9cf1b7.js');
});
var waveformStyles = {
  waveformLines: {
    barWidth: 1,
    barGap: 2
  },
  waveformBars: {
    barWidth: 3,
    barRadius: 3,
    barGap: 3
  }
};
function Waveform(props) {
  var _useState = useState(90),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  if (props.mediaElementId) {
    return /*#__PURE__*/React.createElement(Suspense, {
      fallback: /*#__PURE__*/React.createElement("div", null)
    }, /*#__PURE__*/React.createElement(Measure, {
      client: true,
      onResize: function onResize(contentRect) {
        return setHeight(contentRect.client.height);
      }
    }, function (_ref) {
      var measureRef = _ref.measureRef;
      return /*#__PURE__*/React.createElement("div", {
        ref: measureRef,
        className: styles$2.waveWrapper
      }, /*#__PURE__*/React.createElement(RemotePeakData, {
        audioFile: props.audioFile
      }, function (peakData) {
        return /*#__PURE__*/React.createElement(Wavesurfer, {
          key: props.variant,
          mediaElt: "#".concat(props.mediaElementId),
          audioPeaks: peakData,
          options: _objectSpread2(_objectSpread2({}, waveformStyles[props.variant]), {}, {
            normalize: true,
            removeMediaElementOnDestroy: false,
            hideScrollbar: true,
            progressColor: props.waveformColor || props.mainColor,
            waveColor: props.inverted ? waveColorInverted : waveColor,
            cursorColor: props.inverted ? cursorColorInverted : cursorColor,
            height: height
          })
        });
      }));
    }));
  } else {
    return null;
  }
}

var styles$3 = {"timeDisplay":"TimeDisplay-module_timeDisplay__2UwqM","time":"TimeDisplay-module_time__li1ZU"};

var unknownTimePlaceholder = '-:--';
function formatTime(value) {
  if (isNaN(value)) {
    return unknownTimePlaceholder;
  }

  var seconds = Math.floor(value) % 60;
  var minutes = Math.floor(value / 60) % 60;
  var hours = Math.floor(value / 60 / 60);

  if (hours > 0) {
    return "".concat(hours, ":").concat(pad(minutes), ":").concat(pad(seconds));
  } else {
    return "".concat(minutes, ":").concat(pad(seconds));
  }
}

function pad(value) {
  return value < 10 ? '0' + value : value;
}

function TimeDisplay(props) {
  return /*#__PURE__*/React.createElement("div", {
    "data-testid": 'time-display',
    className: styles$3.timeDisplay
  }, /*#__PURE__*/React.createElement("span", {
    className: styles$3.time
  }, formatTime(props.currentTime)), "/", /*#__PURE__*/React.createElement("span", {
    className: styles$3.time
  }, formatTime(props.duration)));
}

var styles$4 = {"wrapper":"MenuBarButton-module_wrapper__2lFoI","button":"MenuBarButton-module_button__2sY0F ControlBar-module_button___4aXE utils-module_unstyledButton__3rgne","icon":"MenuBarButton-module_icon__2h8__","subMenuItemAnnotation":"MenuBarButton-module_subMenuItemAnnotation__32Quc","subMenu":"MenuBarButton-module_subMenu__f-E-X","subMenuExpanded":"MenuBarButton-module_subMenuExpanded__2UvkJ","subMenuItem":"MenuBarButton-module_subMenuItem__1pyn_","subMenuItemIcon":"MenuBarButton-module_subMenuItemIcon__3iaB-","subMenuItemButton":"MenuBarButton-module_subMenuItemButton__2QnUz utils-module_unstyledButton__3rgne"};

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
var CheckIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M434.442 58.997L195.559 297.881 77.554 179.88 0 257.438l195.559 195.565L512 136.551z"
  }));
});

function MenuBarButton(props) {
  var subMenuItems = props.subMenuItems,
      onClick = props.onClick;

  var _useState = useState(props.subMenuExpanded),
      _useState2 = _slicedToArray(_useState, 2),
      subMenuExpanded = _useState2[0],
      setSubMenuExpanded = _useState2[1];

  var closeMenuTimeout = useRef();
  var openMenu = useCallback(function () {
    if (subMenuItems.length > 0) {
      setSubMenuExpanded(true);
    }
  }, [subMenuItems.length]);
  var closeMenu = useCallback(function () {
    setSubMenuExpanded(false);
  }, []);
  var onButtonClick = useCallback(function (event) {
    openMenu();

    if (onClick) {
      onClick();
    }
  }, [onClick, openMenu]);
  var onFocus = useCallback(function () {
    clearTimeout(closeMenuTimeout.current);
  }, []);
  var onBlur = useCallback(function () {
    clearTimeout(closeMenuTimeout.current);
    closeMenuTimeout.current = setTimeout(function () {
      setSubMenuExpanded(false);
    }, 100);
  }, []);
  var onKeyDown = useCallback(function (event) {
    if (event.key === 'Escape') {
      setSubMenuExpanded(false);
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(_defineProperty({}, styles$4.subMenuExpanded, subMenuExpanded), styles$4.wrapper),
    onMouseEnter: openMenu,
    onMouseLeave: closeMenu,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement("button", {
    className: styles$4.button,
    title: props.title,
    onClick: onButtonClick
  }, React.createElement(props.icon, {
    className: styles$4.icon
  })), renderSubMenu(props, closeMenu));
}
MenuBarButton.defaultProps = {
  subMenuItems: []
};

function renderSubMenu(props, closeMenu) {
  if (props.subMenuItems.length > 0) {
    return /*#__PURE__*/React.createElement("ul", {
      className: styles$4.subMenu,
      role: "menu"
    }, renderSubMenuItems(props, closeMenu));
  }
}

function renderSubMenuItems(props, closeMenu) {
  return props.subMenuItems.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      className: styles$4.subMenuItem,
      key: item.value
    }, /*#__PURE__*/React.createElement("button", {
      className: styles$4.subMenuItemButton,
      role: "menuitemradio",
      "aria-checked": item.active,
      onClick: subMenuItemClickHandler(props, item.value, closeMenu)
    }, renderSubMenuItemIcon(item), item.label, renderSubMenuItemAnnotation(props, item)));
  });
}

function renderSubMenuItemIcon(item) {
  if (item.active) {
    return /*#__PURE__*/React.createElement(CheckIcon, {
      className: styles$4.subMenuItemIcon
    });
  }
}

function renderSubMenuItemAnnotation(props, item) {
  if (item.annotation) {
    return /*#__PURE__*/React.createElement("span", {
      className: styles$4.subMenuItemAnnotation
    }, item.annotation);
  }
}

function subMenuItemClickHandler(props, value, closeMenu) {
  return function (event) {
    event.preventDefault();
    closeMenu();

    if (props.onSubMenuItemClick) {
      props.onSubMenuItemClick(value);
    }
  };
}

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
var TextTracksIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$1({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-3 -3 30 30"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"
  }));
});

function TextTracksMenu(props) {
  var _useI18n = useI18n(),
      t = _useI18n.t;

  if (props.items.length < 2) {
    return null;
  }

  return /*#__PURE__*/React.createElement(MenuBarButton, {
    title: t('pageflow_scrolled.public.player_controls.text_tracks'),
    icon: TextTracksIcon,
    subMenuItems: props.items,
    onSubMenuItemClick: props.onItemClick
  });
}
TextTracksMenu.defaultProps = {
  items: []
};

var styles$5 = {"container":"ControlBar-module_container__1GH64","lightBackground":"ControlBar-module_lightBackground__3-tGf","darkBackground":"ControlBar-module_darkBackground__31Wv7","controlBarContainer":"ControlBar-module_controlBarContainer__1cxRO","inset":"ControlBar-module_inset__JvBh9","controlBarInner":"ControlBar-module_controlBarInner__39fE9","transparent":"ControlBar-module_transparent__eS4af","button":"ControlBar-module_button___4aXE utils-module_unstyledButton__3rgne","playControl":"ControlBar-module_playControl__Vg5et ControlBar-module_button___4aXE utils-module_unstyledButton__3rgne"};

function _extends$2() {
  _extends$2 = Object.assign || function (target) {
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

  return _extends$2.apply(this, arguments);
}
var PlayIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$2({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M8 5v14l11-7z"
  }));
});

function _extends$3() {
  _extends$3 = Object.assign || function (target) {
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

  return _extends$3.apply(this, arguments);
}
var PauseIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$3({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
  }));
});

function PlayPauseButton(props) {
  var _useI18n = useI18n(),
      t = _useI18n.t;

  return /*#__PURE__*/React.createElement("button", {
    className: styles$5.playControl,
    "aria-label": t(props.isPlaying ? 'pause' : 'play', {
      scope: 'pageflow_scrolled.public.player_controls'
    }),
    onClick: function onClick() {
      return props.isPlaying ? props.pause({
        via: 'playPauseButton'
      }) : props.play({
        via: 'playPauseButton'
      });
    }
  }, pausePlayIcon(props));
}

function pausePlayIcon(props) {
  if (props.isPlaying) {
    return /*#__PURE__*/React.createElement(PauseIcon, {
      className: styles$5.controlsIcon
    });
  } else {
    return /*#__PURE__*/React.createElement(PlayIcon, {
      className: styles$5.controlsIcon
    });
  }
}

function WaveformPlayerControls(props) {
  var darkBackground = useDarkBackground();
  var theme = useTheme();
  return /*#__PURE__*/React.createElement("div", {
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    "data-testid": "waveform-controls",
    className: classNames(styles$2.container)
  }, props.children, /*#__PURE__*/React.createElement("div", {
    className: styles$2.clickMask,
    onClick: props.onPlayerClick
  }), /*#__PURE__*/React.createElement(Waveform, {
    audioFile: props.file,
    isPlaying: props.isPlaying,
    inverted: !darkBackground,
    variant: props.variant,
    waveformColor: props.waveformColor,
    mainColor: theme.options.colors.accent,
    play: props.play,
    pause: props.pause,
    mediaElementId: props.mediaElementId
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$2.playControl
  }, /*#__PURE__*/React.createElement(PlayPauseButton, {
    isPlaying: props.isPlaying,
    play: props.play,
    pause: props.pause
  })), /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$2.menuBar, darkBackground ? styles$5.darkBackground : styles$5.lightBackground, _defineProperty({}, styles$5.inset, !props.standAlone))
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$2.menuBarInner
  }, /*#__PURE__*/React.createElement(TimeDisplay, {
    currentTime: props.currentTime,
    duration: props.duration
  }), /*#__PURE__*/React.createElement(TextTracksMenu, {
    items: props.textTracksMenuItems,
    onItemClick: props.onTextTracksMenuItemClick
  })), /*#__PURE__*/React.createElement(InlineFileRights, {
    items: props.inlineFileRightsItems,
    context: "playerControls",
    playerControlsTransparent: false,
    playerControlsStandAlone: props.standAlone
  })));
}

var styles$6 = {"container":"BigPlayPauseButton-module_container__19sKj","pointerCursor":"BigPlayPauseButton-module_pointerCursor__2A55P","hideCursor":"BigPlayPauseButton-module_hideCursor__2Hyys","button":"BigPlayPauseButton-module_button__10g4Q utils-module_unstyledButton__3rgne","hidden":"BigPlayPauseButton-module_hidden__1KUzr","animated":"BigPlayPauseButton-module_animated__1MMNq","fadeOut":"BigPlayPauseButton-module_fadeOut__2vcA_","fadeIn":"BigPlayPauseButton-module_fadeIn__1Ge1-"};

function BigPlayPauseButton(props) {
  var _classNames, _classNames2;

  var c = classNames(styles$6.button, (_classNames = {}, _defineProperty(_classNames, styles$6.hidden, props.hidden || props.lastControlledVia === 'playPauseButton'), _defineProperty(_classNames, styles$6.fadeIn, props.unplayed), _defineProperty(_classNames, styles$6.animated, !props.unplayed), _classNames));
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$6.container, (_classNames2 = {}, _defineProperty(_classNames2, styles$6.hideCursor, props.hideCursor), _defineProperty(_classNames2, styles$6.pointerCursor, !!props.onClick), _classNames2)),
    onClick: props.onClick
  }, /*#__PURE__*/React.createElement("div", {
    key: props.isPlaying,
    className: c
  }, pausePlayIcon$1(props)));
}

function pausePlayIcon$1(props) {
  if (props.unplayed || props.isPlaying) {
    return /*#__PURE__*/React.createElement(PlayIcon, null);
  } else {
    return /*#__PURE__*/React.createElement(PauseIcon, null);
  }
}

var styles$7 = {"container":"ProgressIndicators-module_container__1QiQJ","wrapper":"ProgressIndicators-module_wrapper__2PCVv","draggable":"ProgressIndicators-module_draggable__1iAE8","bars":"ProgressIndicators-module_bars__2-ddd","progressBar":"ProgressIndicators-module_progressBar__2PYn-","background":"ProgressIndicators-module_background__-x5f_ ProgressIndicators-module_progressBar__2PYn-","loadingProgressBar":"ProgressIndicators-module_loadingProgressBar__YD2GH ProgressIndicators-module_progressBar__2PYn-","playProgressBar":"ProgressIndicators-module_playProgressBar__3mCSX ProgressIndicators-module_progressBar__2PYn-","sliderHandle":"ProgressIndicators-module_sliderHandle__3ArIf","dragging":"ProgressIndicators-module_dragging__3yY3t"};

function ProgressIndicators(_ref) {
  var currentTime = _ref.currentTime,
      duration = _ref.duration,
      bufferedEnd = _ref.bufferedEnd,
      scrubTo = _ref.scrubTo,
      seekTo = _ref.seekTo;

  var _useI18n = useI18n(),
      t = _useI18n.t;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      dragging = _useState2[0],
      setDragging = _useState2[1];

  var progressBarsContainerWidth = useRef();
  var positionToTime = useCallback(function (x) {
    if (duration && progressBarsContainerWidth.current) {
      var fraction = Math.max(0, Math.min(1, x / progressBarsContainerWidth.current));
      return fraction * duration;
    } else {
      return 0;
    }
  }, [duration]);
  var handleStop = useCallback(function (mouseEvent, dragEvent) {
    setDragging(false);
    seekTo(positionToTime(dragEvent.x));
  }, [seekTo, positionToTime]);
  var handleDrag = useCallback(function (mouseEvent, dragEvent) {
    setDragging(true);
    scrubTo(positionToTime(dragEvent.x));
  }, [scrubTo, positionToTime]);
  var handleKeyDown = useCallback(function (event) {
    var destination;

    if (event.key === 'ArrowLeft') {
      destination = Math.max(0, currentTime - 1);
    } else if (event.key === 'ArrowRight') {
      destination = Math.min(currentTime + 1, duration || Infinity);
    }

    seekTo(destination);
  }, [seekTo, currentTime, duration]);
  var loadProgress = duration > 0 ? Math.min(1, bufferedEnd / duration) : 0;
  var playProgress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$7.container, _defineProperty({}, styles$7.dragging, dragging)),
    "aria-label": t('pageflow_scrolled.public.player_controls.progress', {
      currentTime: formatTime(currentTime),
      duration: formatTime(duration)
    }),
    onKeyDown: handleKeyDown,
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$7.wrapper
  }, /*#__PURE__*/React.createElement(Measure, {
    client: true,
    onResize: function onResize(contentRect) {
      return progressBarsContainerWidth.current = contentRect.client.width;
    }
  }, function (_ref2) {
    var measureRef = _ref2.measureRef;
    return /*#__PURE__*/React.createElement(DraggableCore, {
      onStart: handleDrag,
      onDrag: handleDrag,
      onStop: handleStop
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames(styles$7.draggable)
    }, /*#__PURE__*/React.createElement("div", {
      ref: measureRef,
      className: styles$7.bars
    }, /*#__PURE__*/React.createElement("div", {
      className: styles$7.background
    }), /*#__PURE__*/React.createElement("div", {
      className: styles$7.loadingProgressBar,
      style: {
        width: toPercent(loadProgress)
      },
      "data-testid": "loading-progress-bar"
    }), /*#__PURE__*/React.createElement("div", {
      className: styles$7.playProgressBar,
      style: {
        width: toPercent(playProgress)
      },
      "data-testid": "play-progress-bar"
    }), /*#__PURE__*/React.createElement("div", {
      className: styles$7.sliderHandle,
      style: {
        left: toPercent(playProgress)
      },
      "data-testid": "slider-handle"
    }))));
  })));
}

function toPercent(value) {
  return value > 0 ? value * 100 + '%' : 0;
}

function _extends$4() {
  _extends$4 = Object.assign || function (target) {
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

  return _extends$4.apply(this, arguments);
}
var QualityIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$4({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-3 -3 30 30"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
  }));
});

function QualityMenu(props) {
  var _useI18n = useI18n(),
      t = _useI18n.t;

  if (props.items.length < 2) {
    return null;
  }

  return /*#__PURE__*/React.createElement(MenuBarButton, {
    title: t('pageflow_scrolled.public.player_controls.quality'),
    icon: QualityIcon,
    subMenuItems: props.items,
    subMenuExpanded: props.subMenuExpanded,
    onSubMenuItemClick: props.onItemClick,
    x: true
  });
}
QualityMenu.defaultProps = {
  items: []
};

function ClassicPlayerControls(props) {
  var darkBackground = useDarkBackground();
  var transparent = !props.standAlone && props.unplayed || props.isPlaying && props.inactive;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.container
  }, props.children, !props.standAlone && /*#__PURE__*/React.createElement(BigPlayPauseButton, {
    unplayed: props.unplayed,
    isPlaying: props.isPlaying,
    lastControlledVia: props.lastControlledVia,
    hidden: props.hideBigPlayButton,
    hideCursor: props.isPlaying && props.inactive,
    onClick: props.onPlayerClick
  }), !props.hideControlBar && renderControlBar(props, darkBackground, transparent));
}

function renderControlBar(props, darkBackground, transparent) {
  var _classNames;

  return /*#__PURE__*/React.createElement("div", {
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    className: classNames(styles$5.controlBarContainer, darkBackground ? styles$5.darkBackground : styles$5.lightBackground, (_classNames = {}, _defineProperty(_classNames, styles$5.inset, !props.standAlone), _defineProperty(_classNames, styles$5.transparent, transparent), _classNames))
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$5.controlBarInner
  }, /*#__PURE__*/React.createElement(PlayPauseButton, {
    isPlaying: props.isPlaying,
    play: props.play,
    pause: props.pause
  }), /*#__PURE__*/React.createElement(ProgressIndicators, {
    currentTime: props.currentTime,
    duration: props.duration,
    bufferedEnd: props.bufferedEnd,
    scrubTo: props.scrubTo,
    seekTo: props.seekTo
  }), /*#__PURE__*/React.createElement(TimeDisplay, {
    currentTime: props.currentTime,
    duration: props.duration
  }), /*#__PURE__*/React.createElement(TextTracksMenu, {
    items: props.textTracksMenuItems,
    onItemClick: props.onTextTracksMenuItemClick
  }), /*#__PURE__*/React.createElement(QualityMenu, {
    items: props.qualityMenuItems,
    onItemClick: props.onQualityMenuItemClick,
    subMenuExpanded: props.qualityMenuExpanded
  })), /*#__PURE__*/React.createElement(InlineFileRights, {
    items: props.inlineFileRightsItems,
    context: "playerControls",
    playerControlsTransparent: transparent,
    playerControlsStandAlone: props.standAlone
  }));
}

function PlayerControls(props) {
  var _props$variant;

  var ControlComponent = ((_props$variant = props.variant) === null || _props$variant === void 0 ? void 0 : _props$variant.startsWith('waveform')) ? WaveformPlayerControls : ClassicPlayerControls;
  return /*#__PURE__*/React.createElement(ControlComponent, props);
}
PlayerControls.defaultProps = {
  currentTime: 200,
  duration: 600,
  bufferedEnd: 400,
  isPlaying: false,
  play: function play() {},
  pause: function pause() {},
  scrubTo: function scrubTo() {},
  seekTo: function seekTo() {},
  inset: false
};

function MediaPlayerControls(props) {
  var playerState = props.playerState;
  var playerActions = props.playerActions;

  var _useI18n = useI18n(),
      t = _useI18n.t;

  var textTracks = useTextTracks({
    file: props.file,
    defaultTextTrackFilePermaId: props.defaultTextTrackFilePermaId,
    captionsByDefault: useMediaMuted()
  });
  var focusOutlineVisible = useFocusOutlineVisible();
  return /*#__PURE__*/React.createElement(PlayerControls, Object.assign({
    type: props.type,
    variant: props.configuration.playerControlVariant,
    waveformColor: props.configuration.waveformColor,
    mediaElementId: playerState.mediaElementId,
    currentTime: playerState.scrubbingAt !== undefined ? playerState.scrubbingAt : playerState.currentTime,
    bufferedEnd: playerState.bufferedEnd,
    duration: playerState.duration,
    isPlaying: playerState.shouldPlay,
    unplayed: playerState.unplayed,
    lastControlledVia: playerState.lastControlledVia,
    inactive: props.autoHide && (playerState.userIdle || !playerState.userHovering) && (!focusOutlineVisible || !playerState.focusInsideControls) && !playerState.userHoveringControls,
    onFocus: playerActions.focusEnteredControls,
    onBlur: playerActions.focusLeftControls,
    onMouseEnter: playerActions.mouseEnteredControls,
    onMouseLeave: playerActions.mouseLeftControls,
    play: playerActions.playBlessed,
    pause: playerActions.pause,
    scrubTo: playerActions.scrubTo,
    seekTo: playerActions.seekTo,
    textTracksMenuItems: getTextTracksMenuItems(textTracks, t),
    onTextTracksMenuItemClick: textTracks.select,
    qualityMenuItems: props.qualityMenuItems,
    onQualityMenuItemClick: props.onQualityMenuItemClick
  }, props));
}
MediaPlayerControls.defaultProps = {
  configuration: {}
};

function getTextTracksMenuItems(textTracks, t) {
  if (!textTracks.files.length) {
    return [];
  }

  return [{
    value: 'off',
    label: t('pageflow_scrolled.public.text_track_modes.none'),
    active: textTracks.mode === 'off'
  }, {
    value: 'auto',
    label: textTracks.autoDisplayLabel,
    active: textTracks.mode === 'auto'
  }].concat(_toConsumableArray(textTracks.files.map(function (textTrackFile) {
    return {
      value: textTrackFile.id,
      label: textTrackFile.displayLabel,
      active: textTracks.mode === 'user' && textTrackFile.id === textTracks.activeFileId
    };
  })));
}

function VideoPlayerControls(_ref) {
  var videoFile = _ref.videoFile,
      props = _objectWithoutProperties(_ref, ["videoFile"]);

  var _useVideoQualitySetti = useVideoQualitySetting(),
      _useVideoQualitySetti2 = _slicedToArray(_useVideoQualitySetti, 2),
      activeQuality = _useVideoQualitySetti2[0],
      setActiveQuality = _useVideoQualitySetti2[1];

  var availableQualities = useAvailableQualities(videoFile);

  var _useI18n = useI18n(),
      t = _useI18n.t;

  return /*#__PURE__*/React.createElement(MediaPlayerControls, Object.assign({}, props, {
    file: videoFile,
    autoHide: true,
    qualityMenuItems: getQualityMenuItems(availableQualities, activeQuality, t),
    onQualityMenuItemClick: setActiveQuality
  }));
}

function getQualityMenuItems(availableQualities, activeQuality, t) {
  return availableQualities.map(function (quality) {
    return {
      value: quality,
      label: t("pageflow_scrolled.public.video_qualities.labels.".concat(quality)),
      annotation: t("pageflow_scrolled.public.video_qualities.annotations.".concat(quality), {
        defaultValue: ''
      }),
      active: activeQuality === quality
    };
  });
}

function AudioPlayerControls(_ref) {
  var audioFile = _ref.audioFile,
      props = _objectWithoutProperties(_ref, ["audioFile"]);

  return /*#__PURE__*/React.createElement(MediaPlayerControls, Object.assign({}, props, {
    file: audioFile
  }));
}

var Viewer = React.lazy(function () {
  return import('./Viewer-1bb5597c.js');
});
function Panorama(props) {
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null)
  }, /*#__PURE__*/React.createElement(Viewer, props));
}

var Viewer$1 = React.lazy(function () {
  return import('./Viewer-1ecf3375.js');
});
function ExpandableImage(_ref) {
  var enabled = _ref.enabled,
      props = _objectWithoutProperties(_ref, ["enabled"]);

  if (!enabled) {
    return props.children;
  }

  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null)
  }, /*#__PURE__*/React.createElement(Viewer$1, props));
}

// from https://github.com/n8tb1t/use-scroll-position
var isBrowser = typeof window !== "undefined";

function getScrollPosition(_ref) {
  var element = _ref.element,
      useWindow = _ref.useWindow;
  if (!isBrowser) return {
    x: 0,
    y: 0
  };
  var target = element ? element.current : document.body;
  var position = target.getBoundingClientRect();
  return useWindow ? {
    x: window.scrollX,
    y: window.scrollY
  } : {
    x: position.left,
    y: position.top
  };
}

function useScrollPosition(effect, deps, element, useWindow, wait) {
  var position = useRef(getScrollPosition({
    useWindow: useWindow
  }));
  var throttleTimeout = null;

  var callBack = function callBack() {
    var currPos = getScrollPosition({
      element: element,
      useWindow: useWindow
    });
    effect({
      prevPos: position.current,
      currPos: currPos
    });
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(function () {
    if (!isBrowser) {
      return;
    }

    var handleScroll = function handleScroll() {
      if (wait) {
        if (throttleTimeout === null) {
          // Todo: store in useRef hook?
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return function () {
      return window.removeEventListener('scroll', handleScroll);
    };
  }, deps);
}
useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null
};

var EditableInlineText = withInlineEditingAlternative('EditableInlineText', function EditableInlineText(_ref) {
  var _value$, _value$$children$;

  var value = _ref.value,
      hyphens = _ref.hyphens,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? '' : _ref$defaultValue;
  return /*#__PURE__*/React.createElement("span", {
    className: classNames(frontendStyles.root, frontendStyles["hyphens-".concat(hyphens)])
  }, value ? (_value$ = value[0]) === null || _value$ === void 0 ? void 0 : (_value$$children$ = _value$.children[0]) === null || _value$$children$ === void 0 ? void 0 : _value$$children$.text : defaultValue);
});

var styles$8 = {"container":"FitViewport-module_container__-awVj","content":"FitViewport-module_content__1_K5a","inner":"FitViewport-module_inner__3psd1","opaque":"FitViewport-module_opaque__3EE3o"};

var AspectRatioContext = React.createContext();
/**
 * Render a div with the given aspect ratio which does not
 * exceed the heigth of the viewport by setting an appropriate
 * `max-width` on the container.
 *
 * Wrap content in `FitViewport.Content` element:
 *
 *    <FitViewport aspectRatio={0.5625}>
 *      <FitViewport.Content>
 *         <div style={{height: '100%'}}>
 *            This div will have the specified aspec ratio
 *            while not exceeding the height of the viewport
 *         </div>
 *      </FitViewport.Content>
 *      <div>
 *        This div will have the same width as the content.
 *      </div>
 *    </FitViewport>
 *
 * @param {Object} props
 * @param {number} [props.aspectRatio] - Aspect ratio of div.
 * @param {Object} [props.file] - Use width/height of file to calculate aspect ratio.
 * @param {number} [props.scale] - Only take up fraction of the viewport height supplied as value between 0 and 1.
 * @param {Object} [props.opaque] - Render black background behind content.
 */

function FitViewport(_ref) {
  var file = _ref.file,
      aspectRatio = _ref.aspectRatio,
      opaque = _ref.opaque,
      children = _ref.children,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? 1 : _ref$scale;

  var _useFullscreenDimensi = useFullscreenDimensions(),
      height = _useFullscreenDimensi.height;

  if (!file && !aspectRatio) return children;
  aspectRatio = aspectRatio || file.height / file.width;
  var maxWidthCSS;

  if (height) {
    // thumbnail view/fixed size: calculate absolute width in px
    maxWidthCSS = height / aspectRatio * scale + 'px';
  } else {
    // published view: set max width to specific aspect ratio depending on viewport height
    maxWidthCSS = 100 / aspectRatio * scale + 'vh';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$8.container, _defineProperty({}, styles$8.opaque, opaque)),
    style: {
      maxWidth: maxWidthCSS
    }
  }, /*#__PURE__*/React.createElement(AspectRatioContext.Provider, {
    value: aspectRatio
  }, children));
}

FitViewport.Content = function FitViewportContent(_ref2) {
  var children = _ref2.children;
  var arPaddingTop = useContext(AspectRatioContext) * 100;

  if (!arPaddingTop) {
    return children;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.content
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: arPaddingTop + '%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$8.inner
  }, children));
};

var styles$9 = {"container":"Tooltip-module_container__3V63U","bubble":"Tooltip-module_bubble__FIL1C scope-tooltip","fixed":"Tooltip-module_fixed__3NGyG","openOnHover":"Tooltip-module_openOnHover__1EeI5","fadeIn":"Tooltip-module_fadeIn__3g9QH","inner":"Tooltip-module_inner__E2hsp","highlight":"Tooltip-module_highlight__2NpuQ","arrow":"Tooltip-module_arrow__3LxXo"};

function Tooltip(_ref) {
  var _classNames;

  var bubbleClassName = _ref.bubbleClassName,
      arrowPos = _ref.arrowPos,
      children = _ref.children,
      content = _ref.content,
      fixed = _ref.fixed,
      highlight = _ref.highlight,
      openOnHover = _ref.openOnHover,
      verticalOffset = _ref.verticalOffset,
      horizontalOffset = _ref.horizontalOffset;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$9.container, (_classNames = {}, _defineProperty(_classNames, styles$9.openOnHover, openOnHover), _defineProperty(_classNames, styles$9.fixed, fixed), _classNames)),
    onClick: fixFocusHandlingSafari
  }, children, /*#__PURE__*/React.createElement(Bubble, {
    className: bubbleClassName,
    highlight: highlight,
    arrowPos: arrowPos,
    verticalOffset: verticalOffset,
    horizontalOffset: horizontalOffset
  }, content));
}
function Bubble(_ref2) {
  var className = _ref2.className,
      arrowPos = _ref2.arrowPos,
      children = _ref2.children,
      highlight = _ref2.highlight,
      horizontalOffset = _ref2.horizontalOffset,
      verticalOffset = _ref2.verticalOffset;
  var inlineStyle = {
    marginLeft: horizontalOffset,
    marginTop: verticalOffset
  }; // Negative tabIndex ensures element can take focus but does not
  // come up in tab order. This ensures the tooltip stays expanded
  // when text in the legal info menu is selected.

  return /*#__PURE__*/React.createElement("div", {
    style: inlineStyle,
    tabIndex: "-1",
    className: classNames(className, styles$9.bubble, _defineProperty({}, styles$9.highlight, highlight))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      left: arrowPos
    },
    className: styles$9.arrow
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$9.inner
  }, children));
} // Safari does not focus buttons after they are clicked [1]. Focus
// manually to ensure `focus-within` selector that opens the tooltip
// applies.
//
// [1] https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus

function fixFocusHandlingSafari(event) {
  if (!event.target.closest) {
    // IE does not support closest, but also does not need this fix.
    return;
  }

  var button = event.target.closest('button');

  if (button) {
    button.focus();
  }
}

Tooltip.defaultProps = {
  arrowPos: '50%',
  fixed: false,
  openOnHover: false,
  verticalOffset: 7,
  horizontalOffset: 0
};

function _extends$5() {
  _extends$5 = Object.assign || function (target) {
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

  return _extends$5.apply(this, arguments);
}
var muted = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$5({
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "volume-mute",
    className: (styles["svg-inline--fa"] || "svg-inline--fa") + " " + (styles["fa-volume-mute"] || "fa-volume-mute") + " " + (styles["fa-w-16"] || "fa-w-16"),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"
  }));
});

function _extends$6() {
  _extends$6 = Object.assign || function (target) {
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

  return _extends$6.apply(this, arguments);
}
var share = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$6({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5 5 84 84"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M67.5 18c-5.1 0-9.3 4.2-9.3 9.3 0 .5.1 1.1.2 1.6l-23 12.9c-1.7-1.8-4.1-3-6.8-3-5.1 0-9.3 4.1-9.3 9.3 0 5.1 4.1 9.3 9.3 9.3 2.7 0 5.2-1.2 6.9-3.1l22.8 13.4c0 .4-.1.7-.1 1.1 0 5.1 4.1 9.3 9.3 9.3 5.1 0 9.3-4.1 9.3-9.3 0-5.1-4.1-9.3-9.3-9.3-2.8 0-5.4 1.3-7.1 3.3L37.7 49.4c.1-.4.1-.9.1-1.3 0-.5 0-1-.1-1.5l23.1-13c1.7 1.8 4.1 3 6.8 3 5.1 0 9.3-4.1 9.3-9.3-.1-5.1-4.3-9.3-9.4-9.3z"
  }));
});

function _extends$7() {
  _extends$7 = Object.assign || function (target) {
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

  return _extends$7.apply(this, arguments);
}
var unmuted = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$7({
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "volume-mute",
    className: (styles["svg-inline--fa"] || "svg-inline--fa") + " " + (styles["fa-volume-mute"] || "fa-volume-mute") + " " + (styles["fa-w-16"] || "fa-w-16"),
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M232.36 64.01a24.007 24.007 0 00-1.176.002c-5.703.15-11.464 2.348-16.155 7.039L126.061 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-14.293-11.514-23.733-23.64-24.01zm149.5 31.994c-8.107-.16-16.098 3.814-20.75 11.217-7.09 11.28-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256c0-63.53-32.06-121.94-85.77-156.24a23.808 23.808 0 00-12.37-3.756zm-55.032 80.174c-8.51-.046-16.795 4.42-21.209 12.402-6.39 11.61-2.159 26.2 9.451 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88 0-31.88-17.54-61.32-45.78-76.86a23.987 23.987 0 00-11.402-2.952z"
  }));
});

function _extends$8() {
  _extends$8 = Object.assign || function (target) {
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

  return _extends$8.apply(this, arguments);
}
var gear = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$8({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "-3 -3 30 30"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
  }));
});

function _extends$9() {
  _extends$9 = Object.assign || function (target) {
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

  return _extends$9.apply(this, arguments);
}
var copyright = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$9({
    xmlns: "http://www.w3.org/2000/svg",
    width: "800",
    height: "800",
    viewBox: "0 0 24 24",
    fill: "none"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M14 9c-.48-.6-1.07-1-2-1-1.923 0-3 1.143-3 4s1.077 4 3 4c.93 0 1.52-.4 2-1m-2 6a9 9 0 100-18 9 9 0 000 18z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
});

function _extends$a() {
  _extends$a = Object.assign || function (target) {
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

  return _extends$a.apply(this, arguments);
}
var email = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$a({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 612 612"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M573.75 57.375H38.25C17.136 57.375 0 74.511 0 95.625v420.75c0 21.133 17.136 38.25 38.25 38.25h535.5c21.133 0 38.25-17.117 38.25-38.25V95.625c0-21.114-17.117-38.25-38.25-38.25zM554.625 497.25H57.375V204.657l224.03 187.999c7.134 5.967 15.874 8.97 24.595 8.97 8.74 0 17.461-3.003 24.595-8.97l224.03-187.999V497.25zm0-367.487L306 338.379 57.375 129.763V114.75h497.25v15.013z"
  }));
});

function _extends$b() {
  _extends$b = Object.assign || function (target) {
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

  return _extends$b.apply(this, arguments);
}
var facebook = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$b({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 430.113 430.114"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M158.081 83.3v59.218h-43.385v72.412h43.385v215.183h89.122V214.936h59.805s5.601-34.721 8.316-72.685H247.54V92.74c0-7.4 9.717-17.354 19.321-17.354h48.557V.001h-66.021C155.878-.004 158.081 72.48 158.081 83.3z"
  }));
});

function _extends$c() {
  _extends$c = Object.assign || function (target) {
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

  return _extends$c.apply(this, arguments);
}
var linkedIn = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$c({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 430.117 430.117"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M430.117 261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707-25.473 0-40.632 17.142-47.301 33.724-2.432 5.928-3.058 14.179-3.058 22.477V420.56h-92.219s1.242-251.285 0-277.32h92.21v39.309c-.187.294-.43.611-.606.896h.606v-.896c12.251-18.869 34.13-45.824 83.102-45.824 60.673-.001 106.157 39.636 106.157 124.818zM52.183 9.558C20.635 9.558 0 30.251 0 57.463c0 26.619 20.038 47.94 50.959 47.94h.616c32.159 0 52.159-21.317 52.159-47.94-.606-27.212-20-47.905-51.551-47.905zM5.477 420.56h92.184V143.24H5.477v277.32z"
  }));
});

function _extends$d() {
  _extends$d = Object.assign || function (target) {
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

  return _extends$d.apply(this, arguments);
}
var telegram = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$d({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512.004 512.004"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M508.194 20.517c-4.43-4.96-11.42-6.29-17.21-3.76l-482 211a15.01 15.01 0 00-8.98 13.41 15.005 15.005 0 008.38 13.79l115.09 56.6 28.68 172.06c.93 6.53 6.06 11.78 12.74 12.73 4.8.69 9.57-1 12.87-4.4l90.86-90.86 129.66 92.62a15.02 15.02 0 0014.24 1.74 15.01 15.01 0 009.19-11.01l90-451c.89-4.47-.26-9.26-3.52-12.92zm-372.84 263.45l-84.75-41.68 334.82-146.57-250.07 188.25zm46.94 44.59l-13.95 69.75-15.05-90.3 183.97-138.49-150.88 151.39c-2.12 2.12-3.53 4.88-4.09 7.65zm9.13 107.3l15.74-78.67 36.71 26.22-52.45 52.45zm205.41 19.94l-176.73-126.23 252.47-253.31-75.74 379.54z"
  }));
});

function _extends$e() {
  _extends$e = Object.assign || function (target) {
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

  return _extends$e.apply(this, arguments);
}
var twitter = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$e({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z"
  }));
});

function _extends$f() {
  _extends$f = Object.assign || function (target) {
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

  return _extends$f.apply(this, arguments);
}
var whatsApp = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$f({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 90 90"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M90 43.841c0 24.213-19.779 43.841-44.182 43.841a44.256 44.256 0 01-21.357-5.455L0 90l7.975-23.522a43.38 43.38 0 01-6.34-22.637C1.635 19.628 21.416 0 45.818 0 70.223 0 90 19.628 90 43.841zM45.818 6.982c-20.484 0-37.146 16.535-37.146 36.859 0 8.065 2.629 15.534 7.076 21.61L11.107 79.14l14.275-4.537A37.122 37.122 0 0045.819 80.7c20.481 0 37.146-16.533 37.146-36.857S66.301 6.982 45.818 6.982zm22.311 46.956c-.273-.447-.994-.717-2.076-1.254-1.084-.537-6.41-3.138-7.4-3.495-.993-.358-1.717-.538-2.438.537-.721 1.076-2.797 3.495-3.43 4.212-.632.719-1.263.809-2.347.271-1.082-.537-4.571-1.673-8.708-5.333-3.219-2.848-5.393-6.364-6.025-7.441-.631-1.075-.066-1.656.475-2.191.488-.482 1.084-1.255 1.625-1.882.543-.628.723-1.075 1.082-1.793.363-.717.182-1.344-.09-1.883-.27-.537-2.438-5.825-3.34-7.977-.902-2.15-1.803-1.792-2.436-1.792-.631 0-1.354-.09-2.076-.09s-1.896.269-2.889 1.344c-.992 1.076-3.789 3.676-3.789 8.963 0 5.288 3.879 10.397 4.422 11.113.541.716 7.49 11.92 18.5 16.223C58.2 65.771 58.2 64.336 60.186 64.156c1.984-.179 6.406-2.599 7.312-5.107.9-2.512.9-4.663.631-5.111z"
  }));
});

var icons = {
  expand: ArrowRightIcon,
  information: information,
  muted: muted,
  share: share,
  unmuted: unmuted,
  gear: gear,
  copyright: copyright,
  email: email,
  facebook: facebook,
  linkedIn: linkedIn,
  telegram: telegram,
  twitter: twitter,
  whatsApp: whatsApp,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon
};
/**
 * Render an SVG icon that can be customized in themes.
 *
 * @param {Object} props
 * @param {string} props.name -
 *   Either: copyright, expand, gear, information, muted, share, unmuted,
 *   email, facebook, linkedIn, telegram, twitter, whatsApp,
 *   arrowLeft, arrowRight,
 * @params {number} [props.width] - Image width.
 * @params {number} [props.height] - Image height.
 */

function ThemeIcon(_ref) {
  var name = _ref.name,
      width = _ref.width,
      height = _ref.height;
  var theme = useTheme();
  var FallbackIcon = icons[name];
  var themeAsset = theme.assets.icons[name];

  if (!FallbackIcon) {
    throw new Error("Unknown icon '".concat(name, "'. Available options: ").concat(Object.keys(icons).join(', '), "."));
  }

  if (themeAsset) {
    return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height
    }, /*#__PURE__*/React.createElement("use", {
      xlinkHref: "".concat(themeAsset, "#icon")
    }));
  } else {
    return /*#__PURE__*/React.createElement(FallbackIcon, {
      width: width,
      height: height
    });
  }
}

function textColorForBackgroundColor(hex) {
  return invert(hex, true);
}

function registerTemplateWidgetType (typeName, callback) {
  var element = document.getElementById('template-widget-container');
  callback(element);
}

var utils = {
  camelize: camelize,
  isBlank: isBlank,
  isBlankEditableTextValue: isBlankEditableTextValue,
  presence: presence
};

var editMode = typeof window !== 'undefined' && window.location.pathname.indexOf('/editor/entries') === 0;
var withShadowClassName = styles$a.withShadow;

global.pageflowScrolledRender = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(seed) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setupI18n(seed.i18n);
            features.enable('frontend', seed.config.enabledFeatureNames);
            _context.next = 4;
            return browser.detectFeatures();

          case 4:
            _context.next = 6;
            return loadDashUnlessHlsSupported(seed);

          case 6:
            if (!editMode) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return loadInlineEditingComponents();

          case 9:
            _context.next = 12;
            break;

          case 11:
            registerVendors({
              contentElementTypes: api.contentElementTypes,
              consent: consent,
              seed: seed
            });

          case 12:
            render(seed);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

global.pageflowScrolledRegisterUpdateSeedHandler = function () {
  if (window.parent !== window) {
    window.addEventListener('message', receive);
  }

  function receive(message) {
    if (window.location.href.indexOf(message.origin) === 0) {
      if (message.data.type === 'UPDATE_SEED') {
        render(message.data.payload);
      }
    }
  }
};

function render(seed) {
  if (editMode) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Root, {
      seed: seed
    }), document.getElementById('root'));
  } else {
    ReactDOM.hydrate( /*#__PURE__*/React.createElement(Root, {
      seed: seed
    }), document.getElementById('root'));
  }
}

function Root(_ref2) {
  var seed = _ref2.seed;
  return /*#__PURE__*/React.createElement(RootProviders, {
    seed: seed
  }, /*#__PURE__*/React.createElement(Entry, null));
}

export { AudioPlayerControls, ClassicPlayerControls, ContentElementBox, ContentElementFigure, EditableInlineText, Entry, ExpandableImage, Figure, FitViewport, MediaInteractionTracking, MediaPlayerControls, Panorama, PlayerControls, Root, ThemeIcon, Tooltip, VideoPlayerControls, WaveformPlayerControls, registerTemplateWidgetType, textColorForBackgroundColor, useScrollPosition, utils, withShadowClassName };
