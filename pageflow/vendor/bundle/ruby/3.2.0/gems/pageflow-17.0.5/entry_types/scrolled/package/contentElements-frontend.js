import { useContentElementConfigurationUpdate, useI18n, useDarkBackground, useContentElementEditorState, useIsStaticPreview, useContentElementLifecycle, utils, contentElementWidths, withShadowClassName, paletteColor, Text, EditableInlineText, frontend, useFileWithInlineRights, FitViewport, ContentElementBox, ContentElementFigure, InlineFileRights, usePortraitOrientation, ExpandableImage, Image, usePlayerState, MediaInteractionTracking, useAudioFocus, VideoPlayerControls, PlayerEventContextDataProvider, VideoPlayer, AudioPlayerControls, AudioPlayer, useMediaMuted, useTheme, EditableText, ThirdPartyOptOutInfo, useFile, ThirdPartyOptIn, useAtmo, textColorForBackgroundColor, Panorama, ThemeIcon, useLocale, Figure, usePhonePlatform, FullscreenViewer, ToggleFullscreenCornerButton } from 'pageflow-scrolled/frontend';
import React, { useState, useRef, useEffect, useMemo, useCallback, forwardRef } from 'react';
import classNames from 'classnames';
import ReactCompareImage from 'react-compare-image';
import Measure from 'react-measure';
import { media, documentHiddenState, features } from 'pageflow/frontend';
import ReactPlayer from 'react-player';

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

var styles = {"darkContentTextColor":"var(--theme-dark-content-text-color, #222)","lightContentTextColor":"var(--theme-light-content-text-color, #fff)","root":"Heading-module_root__33TFw","animation-fadeIn":"Heading-module_animation-fadeIn__3jlOG","animation-fadeInFast":"Heading-module_animation-fadeInFast__b41KH Heading-module_animation-fadeIn__3jlOG","animation-fadeInSlow":"Heading-module_animation-fadeInSlow__1G1o5 Heading-module_animation-fadeIn__3jlOG","main":"Heading-module_main__35wWK","tagline":"Heading-module_tagline__pvHO5","subtitle":"Heading-module_subtitle__19eD8","animating":"Heading-module_animating__1ziJR","hasTagline":"Heading-module_hasTagline__Pgn8c","right":"Heading-module_right__1TJKF","light":"Heading-module_light__1TQE8","dark":"Heading-module_dark__18iWa","centerRagged":"Heading-module_centerRagged__388sq","center":"Heading-module_center__38lDY","forcePaddingTop":"Heading-module_forcePaddingTop__30Juh"};

function Heading(_ref) {
  var configuration = _ref.configuration,
      sectionProps = _ref.sectionProps,
      contentElementWidth = _ref.contentElementWidth;
  var level = configuration.level || sectionProps.sectionIndex;
  var firstSectionInEntry = level === 0;
  var updateConfiguration = useContentElementConfigurationUpdate();

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  var darkBackground = useDarkBackground();

  var _useContentElementEdi = useContentElementEditorState(),
      isSelected = _useContentElementEdi.isSelected,
      isEditable = _useContentElementEdi.isEditable;

  var legacyValue = configuration.children;
  var Tag = firstSectionInEntry ? 'h1' : 'h2';
  var forcePaddingTop = firstSectionInEntry && !('marginTop' in configuration);
  var entranceAnimation = !useIsStaticPreview() && configuration.entranceAnimation || 'none';

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      animating = _useState2[0],
      setAnimating = _useState2[1];

  useContentElementLifecycle({
    onActivate: function onActivate() {
      setAnimating(entranceAnimation !== 'none');
    },
    onInvisible: function onInvisible() {
      if (isEditable) {
        setAnimating(false);
      }
    }
  });
  var previousAnimation = useRef(entranceAnimation);
  var previouslySelected = useRef(isSelected);
  useEffect(function () {
    if (isEditable && previousAnimation.current !== entranceAnimation) {
      previousAnimation.current = entranceAnimation;
      setAnimating(false);
      setTimeout(function () {
        return setAnimating(true);
      }, 100);
    }
  }, [entranceAnimation, isEditable]);
  useEffect(function () {
    if (!previouslySelected.current && isSelected) {
      setAnimating(true);
    }

    previouslySelected.current = isSelected;
  }, [isSelected]);

  function renderSubtitle(name) {
    var value = configuration[name];

    if (!isSelected && utils.isBlankEditableTextValue(value)) {
      return null;
    }

    return /*#__PURE__*/React.createElement(Text, {
      scaleCategory: getScaleCategory(configuration, firstSectionInEntry, name)
    }, /*#__PURE__*/React.createElement("div", {
      className: styles[name],
      role: "doc-subtitle"
    }, /*#__PURE__*/React.createElement(EditableInlineText, {
      value: value,
      hyphens: configuration.hyphens,
      placeholder: t("pageflow_scrolled.inline_editing.type_".concat(name)),
      onChange: function onChange(value) {
        return updateConfiguration(_defineProperty({}, name, value));
      }
    })));
  }

  return /*#__PURE__*/React.createElement("header", {
    className: classNames(styles.root, styles["animation-".concat(entranceAnimation)], _defineProperty({}, styles.animating, animating), _defineProperty({}, styles.hasTagline, !utils.isBlankEditableTextValue(configuration.tagline) || isSelected), _defineProperty({}, styles.forcePaddingTop, forcePaddingTop), _defineProperty({}, styles[sectionProps.layout], contentElementWidth > contentElementWidths.md || sectionProps.layout === 'centerRagged'), _defineProperty({}, withShadowClassName, !sectionProps.invert))
  }, renderSubtitle('tagline'), /*#__PURE__*/React.createElement(Tag, {
    className: classNames(styles.main, 'scope-headings', configuration.typographyVariant && "typography-heading-".concat(configuration.typographyVariant), darkBackground ? styles.light : styles.dark),
    style: {
      color: paletteColor(configuration.color)
    }
  }, /*#__PURE__*/React.createElement(Text, {
    scaleCategory: getScaleCategory(configuration, firstSectionInEntry),
    inline: true
  }, /*#__PURE__*/React.createElement(EditableInlineText, {
    value: configuration.value,
    defaultValue: legacyValue,
    hyphens: configuration.hyphens,
    placeholder: firstSectionInEntry ? t('pageflow_scrolled.inline_editing.type_title') : t('pageflow_scrolled.inline_editing.type_heading'),
    onChange: function onChange(value) {
      return updateConfiguration({
        value: value
      });
    }
  }))), renderSubtitle('subtitle'));
}

function getScaleCategory(configuration, firstSectionInEntry) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var base = "heading".concat(capitalize(suffix));

  switch (configuration.textSize) {
    case 'large':
      return "".concat(base, "-lg");

    case 'medium':
      return "".concat(base, "-md");

    case 'small':
      return "".concat(base, "-sm");

    default:
      return firstSectionInEntry ? "".concat(base, "-lg") : "".concat(base, "-sm");
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

frontend.contentElementTypes.register('heading', {
  component: Heading,
  lifecycle: true
});

var styles$1 = {"sliderStart":"BeforeAfter-module_sliderStart__2C5cN","container":"BeforeAfter-module_container__2Lm06","wiggle":"BeforeAfter-module_wiggle__3nVSe","SliderLeftRightShake":"BeforeAfter-module_SliderLeftRightShake__2mcn5","BeforeImageLeftRightShake":"BeforeAfter-module_BeforeImageLeftRightShake__38m9V","AfterImageLeftRightShake":"BeforeAfter-module_AfterImageLeftRightShake__3WMf1"};

var placeholderForBeforeImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQwMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9IiMzZDVhODAiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSI0MDUiIHdpZHRoPSI2NDIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiA8L2c+Cjwvc3ZnPg==';
var placeholderForAfterImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjQwMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9IiM5OGMxZDkiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSI0MDUiIHdpZHRoPSI2NDIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiA8L2c+Cjwvc3ZnPg==';
var placeholderFile = {
  width: 640,
  height: 403
};
function BeforeAfter(configuration) {
  var isActive = configuration.isActive,
      load = configuration.load,
      before_label = configuration.before_label,
      after_label = configuration.after_label,
      initial_slider_position = configuration.initial_slider_position,
      slider_color = configuration.slider_color;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      wiggle = _useState2[0],
      setWiggle = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      moved = _useState4[0],
      setMoved = _useState4[1];

  useEffect(function () {
    // Only wiggle once per element, when it is active for the first
    // time
    setWiggle(function (wiggle) {
      return wiggle || isActive;
    });
  }, [isActive]);
  var beforeImage = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'before_id'
  });
  var afterImage = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'after_id'
  });

  var _useContentElementEdi = useContentElementEditorState(),
      isSelected = _useContentElementEdi.isSelected;

  var beforeImageUrl = beforeImage && beforeImage.urls.large;
  var beforeImageAlt = beforeImage && beforeImage.configuration.alt;
  var afterImageUrl = afterImage && afterImage.urls.large;
  var afterImageAlt = afterImage && afterImage.configuration.alt;
  var initialSliderPos = initial_slider_position / 100;
  var inlineFileRightsItems = [{
    file: beforeImage,
    label: 'before'
  }, {
    file: afterImage,
    label: 'after'
  }];
  return /*#__PURE__*/React.createElement(FitViewport, {
    file: beforeImage || afterImage || placeholderFile
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, /*#__PURE__*/React.createElement(Measure, {
    bounds: true
  }, function (_ref) {
    var _cx;

    var measureRef = _ref.measureRef,
        contentRect = _ref.contentRect;
    var initialRectWidth = contentRect.bounds.width * initialSliderPos + 'px';
    return /*#__PURE__*/React.createElement("div", {
      ref: measureRef,
      style: {
        '--initial-rect-width': initialRectWidth
      },
      className: classNames((_cx = {}, _defineProperty(_cx, styles$1.selected, isSelected), _defineProperty(_cx, styles$1.wiggle, wiggle && !moved), _cx), styles$1.container)
    }, /*#__PURE__*/React.createElement(InitialSliderPositionIndicator, {
      parentSelected: isSelected,
      position: initial_slider_position
    }), renderCompareImage());
  }), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "insideElement",
    items: inlineFileRightsItems
  })))), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "afterElement",
    items: inlineFileRightsItems
  }));

  function renderCompareImage() {
    if (!load) {
      return null;
    }

    return /*#__PURE__*/React.createElement(ReactCompareImage, {
      leftImage: beforeImage ? beforeImageUrl : placeholderForBeforeImage,
      rightImage: afterImage ? afterImageUrl : placeholderForAfterImage,
      leftImageLabel: before_label,
      rightImageLabel: after_label,
      leftImageAlt: beforeImageAlt,
      rightImageAlt: afterImageAlt,
      sliderPositionPercentage: initialSliderPos,
      onSliderPositionChange: function onSliderPositionChange() {
        return setMoved(true);
      },
      sliderLineColor: slider_color || undefined
    });
  }
}

function InitialSliderPositionIndicator(_ref2) {
  var parentSelected = _ref2.parentSelected,
      position = _ref2.position;
  var indicatorWidth = '2px';
  var indicatorStyles = {
    left: "calc(".concat(position, "% - ").concat(indicatorWidth, "/2)"),
    width: "".concat(indicatorWidth),
    height: '100%',
    borderLeft: '1px solid black',
    borderRight: '1px solid black'
  }; // In case this element is selected, and its initial slider position
  // is not in the middle, we show InitialSliderPositionIndicator

  return parentSelected && position !== 50 ? /*#__PURE__*/React.createElement("div", {
    className: styles$1.sliderStart,
    style: indicatorStyles
  }) : '';
}

function InlineBeforeAfter(props) {
  var _useContentElementLif = useContentElementLifecycle(),
      isActive = _useContentElementLif.isActive,
      shouldLoad = _useContentElementLif.shouldLoad;

  return /*#__PURE__*/React.createElement(BeforeAfter, Object.assign({}, props.configuration, {
    load: shouldLoad,
    isActive: isActive
  }));
}

frontend.contentElementTypes.register('inlineBeforeAfter', {
  component: InlineBeforeAfter,
  lifecycle: true
});

function InlineImage(_ref) {
  var contentElementId = _ref.contentElementId,
      contentElementWidth = _ref.contentElementWidth,
      configuration = _ref.configuration;
  var imageFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'id'
  });
  var portraitImageFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'portraitId'
  }); // Only render OrientationAwareInlineImage if a portrait image has
  // been selected. This prevents having the component rerender on
  // orientation changes even if it does not depend on orientation at
  // all.

  if (portraitImageFile) {
    return /*#__PURE__*/React.createElement(OrientationAwareInlineImage, {
      landscapeImageFile: imageFile,
      portraitImageFile: portraitImageFile,
      contentElementId: contentElementId,
      contentElementWidth: contentElementWidth,
      configuration: configuration
    });
  } else {
    return /*#__PURE__*/React.createElement(ImageWithCaption, {
      imageFile: imageFile,
      contentElementId: contentElementId,
      contentElementWidth: contentElementWidth,
      configuration: configuration
    });
  }
}

function OrientationAwareInlineImage(_ref2) {
  var landscapeImageFile = _ref2.landscapeImageFile,
      portraitImageFile = _ref2.portraitImageFile,
      contentElementId = _ref2.contentElementId,
      contentElementWidth = _ref2.contentElementWidth,
      configuration = _ref2.configuration;
  var portraitOrientation = usePortraitOrientation();
  var imageFile = portraitOrientation && portraitImageFile ? portraitImageFile : landscapeImageFile;
  return /*#__PURE__*/React.createElement(ImageWithCaption, {
    imageFile: imageFile,
    contentElementId: contentElementId,
    contentElementWidth: contentElementWidth,
    configuration: configuration
  });
}

function ImageWithCaption(_ref3) {
  var imageFile = _ref3.imageFile,
      contentElementId = _ref3.contentElementId,
      contentElementWidth = _ref3.contentElementWidth,
      configuration = _ref3.configuration;

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var enableFullscreen = configuration.enableFullscreen;
  var supportFullscreen = enableFullscreen && contentElementWidth < contentElementWidths.full;
  return /*#__PURE__*/React.createElement(FitViewport, {
    file: imageFile,
    aspectRatio: imageFile ? undefined : 0.75,
    opaque: !imageFile
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, /*#__PURE__*/React.createElement(ExpandableImage, {
    enabled: supportFullscreen && shouldLoad,
    imageFile: imageFile,
    contentElementId: contentElementId
  }, /*#__PURE__*/React.createElement(Image, {
    imageFile: imageFile,
    load: shouldLoad,
    structuredData: true,
    variant: contentElementWidth === contentElementWidths.full ? 'large' : 'medium',
    preferSvg: true
  })), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "insideElement",
    items: [{
      file: imageFile,
      label: 'image'
    }]
  })))), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "afterElement",
    items: [{
      file: imageFile,
      label: 'image'
    }]
  }));
}

frontend.contentElementTypes.register('inlineImage', {
  component: InlineImage,
  lifecycle: true
});

var styles$2 = {"wrapper":"MutedIndicator-module_wrapper__17JUY","visible":"MutedIndicator-module_visible__3qARn","eqBar":"MutedIndicator-module_eqBar__1cMDE","eqBar1":"MutedIndicator-module_eqBar1__2Ap_R MutedIndicator-module_eqBar__1cMDE","short-eq":"MutedIndicator-module_short-eq__1OYlk","eqBar2":"MutedIndicator-module_eqBar2__2QTgX MutedIndicator-module_eqBar__1cMDE","tall-eq":"MutedIndicator-module_tall-eq__6gm0B","eqBar3":"MutedIndicator-module_eqBar3__2S-y3 MutedIndicator-module_eqBar__1cMDE"};

function MutedIndicator(_ref) {
  var visible = _ref.visible;
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$2.wrapper, _defineProperty({}, styles$2.visible, visible))
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("rect", {
    className: styles$2.eqBar1,
    x: "4",
    y: "4",
    width: "3.7",
    height: "8"
  }), /*#__PURE__*/React.createElement("rect", {
    className: styles$2.eqBar2,
    x: "10.2",
    y: "4",
    width: "3.7",
    height: "16"
  }), /*#__PURE__*/React.createElement("rect", {
    className: styles$2.eqBar3,
    x: "16.3",
    y: "4",
    width: "3.7",
    height: "11"
  })));
}

function getLifecycleHandlers(configuration, playerActions) {
  return {
    onVisible: function onVisible() {
      if (configuration.playbackMode === 'loop') {
        playerActions.play();
      }
    },
    onActivate: function onActivate() {
      if (configuration.playbackMode === 'autoplay' || !configuration.playbackMode && configuration.autoplay) {
        playerActions.play({
          via: 'autoplay'
        });
      }
    },
    onDeactivate: function onDeactivate() {
      if (configuration.playbackMode !== 'loop') {
        playerActions.fadeOutAndPause(400);
      }
    },
    onInvisible: function onInvisible() {
      if (configuration.playbackMode === 'loop') {
        playerActions.fadeOutAndPause(400);
      }
    }
  };
}
function getPlayerClickHandler(_ref) {
  var configuration = _ref.configuration,
      playerActions = _ref.playerActions,
      shouldPlay = _ref.shouldPlay,
      lastControlledVia = _ref.lastControlledVia,
      mediaMuted = _ref.mediaMuted,
      isEditable = _ref.isEditable,
      isSelected = _ref.isSelected;

  if (isEditable && !isSelected) {
    return null;
  } else if (configuration.playbackMode === 'loop') {
    if (mediaMuted && !configuration.keepMuted) {
      return function () {
        return playerActions.playBlessed();
      };
    } else {
      return null;
    }
  } else if (configuration.keepMuted) {
    return function () {
      if (shouldPlay) {
        playerActions.pause();
      } else {
        playerActions.play();
      }
    };
  } else {
    return function () {
      if (shouldPlay && mediaMuted) {
        if (configuration.rewindOnUnmute && lastControlledVia === 'autoplay') {
          playerActions.seekTo(0);
        }

        playerActions.playBlessed();
      } else if (shouldPlay) {
        playerActions.pause();
      } else {
        playerActions.playBlessed();
      }
    };
  }
}

function InlineVideo(_ref) {
  var contentElementId = _ref.contentElementId,
      configuration = _ref.configuration;
  var videoFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'videoFiles',
    propertyName: 'id'
  });
  var posterImageFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'posterId'
  });
  var portraitVideoFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'videoFiles',
    propertyName: 'portraitId'
  });
  var portraitPosterImageFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'portraitPosterId'
  }); // Only render OrientationAwareInlineImage if a portrait image has
  // been selected. This prevents having the component rerender on
  // orientation changes even if it does not depend on orientation at
  // all.

  if (portraitVideoFile) {
    return /*#__PURE__*/React.createElement(OrientationAwareInlineVideo, {
      landscapeVideoFile: videoFile,
      portraitVideoFile: portraitVideoFile,
      landscapePosterImageFile: posterImageFile,
      portraitPosterImageFile: portraitPosterImageFile,
      contentElementId: contentElementId,
      configuration: configuration
    });
  } else {
    return /*#__PURE__*/React.createElement(OrientationUnawareInlineVideo, {
      videoFile: videoFile,
      posterImageFile: posterImageFile,
      contentElementId: contentElementId,
      configuration: configuration
    });
  }
}

function OrientationAwareInlineVideo(_ref2) {
  var landscapeVideoFile = _ref2.landscapeVideoFile,
      portraitVideoFile = _ref2.portraitVideoFile,
      landscapePosterImageFile = _ref2.landscapePosterImageFile,
      portraitPosterImageFile = _ref2.portraitPosterImageFile,
      contentElementId = _ref2.contentElementId,
      configuration = _ref2.configuration;
  var portraitOrientation = usePortraitOrientation();
  var videoFile = portraitOrientation && portraitVideoFile ? portraitVideoFile : landscapeVideoFile;
  var posterImageFile = portraitOrientation && portraitPosterImageFile ? portraitPosterImageFile : landscapePosterImageFile;
  return /*#__PURE__*/React.createElement(OrientationUnawareInlineVideo, {
    key: portraitOrientation,
    videoFile: videoFile,
    posterImageFile: posterImageFile,
    contentElementId: contentElementId,
    configuration: configuration
  });
}

function OrientationUnawareInlineVideo(_ref3) {
  var videoFile = _ref3.videoFile,
      posterImageFile = _ref3.posterImageFile,
      contentElementId = _ref3.contentElementId,
      configuration = _ref3.configuration;

  var _usePlayerState = usePlayerState(),
      _usePlayerState2 = _slicedToArray(_usePlayerState, 2),
      playerState = _usePlayerState2[0],
      playerActions = _usePlayerState2[1];

  var inlineFileRightsItems = [{
    label: 'video',
    file: videoFile
  }, {
    label: 'poster',
    file: posterImageFile
  }];
  return /*#__PURE__*/React.createElement(MediaInteractionTracking, {
    playerState: playerState,
    playerActions: playerActions
  }, /*#__PURE__*/React.createElement(FitViewport, {
    file: videoFile,
    aspectRatio: videoFile ? undefined : fallbackAspectRatio,
    opaque: !videoFile
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, /*#__PURE__*/React.createElement(MutedIndicator, {
    visible: media.muted && playerState.shouldPlay && !configuration.keepMuted
  }), /*#__PURE__*/React.createElement(Player, {
    key: configuration.playbackMode === 'loop',
    videoFile: videoFile,
    posterImageFile: posterImageFile,
    inlineFileRightsItems: inlineFileRightsItems,
    playerState: playerState,
    playerActions: playerActions,
    contentElementId: contentElementId,
    configuration: configuration
  })))), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "afterElement",
    items: inlineFileRightsItems
  })));
}

function Player(_ref4) {
  var videoFile = _ref4.videoFile,
      posterImageFile = _ref4.posterImageFile,
      inlineFileRightsItems = _ref4.inlineFileRightsItems,
      playerState = _ref4.playerState,
      playerActions = _ref4.playerActions,
      contentElementId = _ref4.contentElementId,
      configuration = _ref4.configuration;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var _useContentElementLif = useContentElementLifecycle(getLifecycleHandlers(configuration, playerActions)),
      shouldLoad = _useContentElementLif.shouldLoad,
      shouldPrepare = _useContentElementLif.shouldPrepare;

  useAudioFocus({
    key: contentElementId,
    request: playerState.shouldPlay,
    onLost: function onLost() {
      if (configuration.playbackMode !== 'loop') {
        playerActions.fadeOutAndPause(400);
      }
    }
  });
  var onPlayerClick = getPlayerClickHandler({
    configuration: configuration,
    playerActions: playerActions,
    shouldPlay: playerState.shouldPlay,
    lastControlledVia: playerState.lastControlledVia,
    mediaMuted: media.muted,
    isEditable: isEditable,
    isSelected: isSelected
  });
  useEffect(function () {
    if (configuration.playbackMode !== 'loop') {
      return;
    }

    var documentState = documentHiddenState(function (visibilityState) {
      if (visibilityState === 'hidden') {
        playerActions.fadeOutAndPause(400);
      } else {
        playerActions.play();
      }
    });
    return function () {
      return documentState.removeCallback();
    };
  }, [playerActions, configuration.playbackMode]);
  return /*#__PURE__*/React.createElement(VideoPlayerControls, {
    videoFile: videoFile,
    defaultTextTrackFilePermaId: configuration.defaultTextTrackFileId,
    playerState: playerState,
    playerActions: playerActions,
    hideControlBar: configuration.hideControlBar || configuration.playbackMode === 'loop',
    hideBigPlayButton: configuration.playbackMode === 'loop',
    inlineFileRightsItems: inlineFileRightsItems,
    configuration: configuration,
    onPlayerClick: onPlayerClick
  }, /*#__PURE__*/React.createElement(PlayerEventContextDataProvider, {
    playerDescription: "Inline Video",
    playbackMode: configuration.playbackMode || (configuration.autoplay ? 'autoplay' : 'manual')
  }, /*#__PURE__*/React.createElement(VideoPlayer, {
    load: shouldPrepare ? 'auto' : shouldLoad ? 'poster' : 'none',
    loop: configuration.playbackMode === 'loop',
    playerState: playerState,
    playerActions: playerActions,
    videoFile: videoFile,
    posterImageFile: posterImageFile,
    defaultTextTrackFilePermaId: configuration.defaultTextTrackFileId,
    quality: 'high',
    playsInline: true,
    atmoDuringPlayback: configuration.atmoDuringPlayback
  })));
}

var fallbackAspectRatio = 0.5625;

frontend.contentElementTypes.register('inlineVideo', {
  component: InlineVideo,
  lifecycle: true
});

function InlineAudio(_ref) {
  var contentElementId = _ref.contentElementId,
      configuration = _ref.configuration;
  var audioFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'audioFiles',
    propertyName: 'id'
  });
  var posterImageFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'posterId'
  });

  var _usePlayerState = usePlayerState(),
      _usePlayerState2 = _slicedToArray(_usePlayerState, 2),
      playerState = _usePlayerState2[0],
      playerActions = _usePlayerState2[1];

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var _useContentElementLif = useContentElementLifecycle({
    onActivate: function onActivate() {
      if (configuration.autoplay && !media.muted) {
        playerActions.play();
      }
    },
    onDeactivate: function onDeactivate() {
      playerActions.fadeOutAndPause(400);
    }
  }),
      shouldLoad = _useContentElementLif.shouldLoad,
      shouldPrepare = _useContentElementLif.shouldPrepare;

  useAudioFocus({
    key: contentElementId,
    request: playerState.shouldPlay,
    onLost: function onLost() {
      playerActions.fadeOutAndPause(400);
    }
  });

  var onPlayerClick = function onPlayerClick() {
    if (isEditable && !isSelected) {
      return;
    }

    if (playerState.shouldPlay) {
      playerActions.pause();
    } else {
      playerActions.playBlessed();
    }
  };

  var inlineFileRightsItems = [{
    label: 'audio',
    file: audioFile
  }, {
    label: 'image',
    file: posterImageFile
  }];
  return /*#__PURE__*/React.createElement(FitViewport, {
    file: posterImageFile
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, /*#__PURE__*/React.createElement(AudioPlayerControls, {
    audioFile: audioFile,
    defaultTextTrackFilePermaId: configuration.defaultTextTrackFileId,
    playerState: playerState,
    playerActions: playerActions,
    standAlone: !posterImageFile,
    inlineFileRightsItems: inlineFileRightsItems,
    configuration: configuration,
    onPlayerClick: onPlayerClick
  }, /*#__PURE__*/React.createElement(PlayerEventContextDataProvider, {
    playerDescription: "Inline Audio",
    playbackMode: configuration.autoplay ? 'autoplay' : 'manual'
  }, /*#__PURE__*/React.createElement(AudioPlayer, {
    load: shouldPrepare ? 'auto' : shouldLoad ? 'poster' : 'none',
    controls: configuration.controls,
    playerState: playerState,
    playerActions: playerActions,
    audioFile: audioFile,
    posterImageFile: posterImageFile,
    defaultTextTrackFilePermaId: configuration.defaultTextTrackFileId,
    quality: 'high',
    playsInline: true,
    atmoDuringPlayback: configuration.atmoDuringPlayback
  })))))), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "afterElement",
    items: inlineFileRightsItems
  }));
}

frontend.contentElementTypes.register('inlineAudio', {
  component: InlineAudio,
  lifecycle: true
});

var styles$3 = {"soundDisclaimer":"SoundDisclaimer-module_soundDisclaimer__31hWh","unmute":"SoundDisclaimer-module_unmute__1V4Ab","unmuted":"SoundDisclaimer-module_unmuted__22CJ5","active":"SoundDisclaimer-module_active__11_kc"};

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
var MutedIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends({
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
var UnmutedIcon = (function (_ref) {
  var _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$1({
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

function SoundDisclaimer() {
  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var _useI18n = useI18n(),
      t = _useI18n.t;

  var muted = useMediaMuted();
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$3.soundDisclaimer),
    style: {
      pointerEvents: isEditable && !isSelected ? 'none' : undefined
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: classNames(styles$3.unmute, _defineProperty({}, styles$3.active, muted)),
    onClick: function onClick() {
      return media.mute(false);
    }
  }, /*#__PURE__*/React.createElement(MutedIcon, null), /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: t('pageflow_scrolled.public.sound_disclaimer.help_muted')
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$3.unmuted, _defineProperty({}, styles$3.active, !muted))
  }, /*#__PURE__*/React.createElement(UnmutedIcon, null), /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: t('pageflow_scrolled.public.sound_disclaimer.help_unmuted')
    }
  })));
}

frontend.contentElementTypes.register('soundDisclaimer', {
  component: SoundDisclaimer
});

var styles$4 = {"contentLinkColor":"var(--content-link-color)","breakpoint-sm":"(min-width: 640px)","text":"TextBlock-module_text__21Hk4","quoteDesign-hanging":"TextBlock-module_quoteDesign-hanging__1c9AW","quoteDesign-largeHanging":"TextBlock-module_quoteDesign-largeHanging__2VkIW","layout-centerRagged":"TextBlock-module_layout-centerRagged__1tjoI"};

function TextBlock(props) {
  var updateConfiguration = useContentElementConfigurationUpdate();

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  var theme = useTheme();
  var className = classNames(styles$4.text, styles$4["quoteDesign-".concat(theme.options.quoteDesign || 'largeHanging')], styles$4["layout-".concat(props.sectionProps.layout)]);
  return /*#__PURE__*/React.createElement(EditableText, {
    value: props.configuration.value,
    contentElementId: props.contentElementId,
    className: className,
    selectionRect: true,
    placeholder: t('pageflow_scrolled.inline_editing.type_text'),
    onChange: function onChange(value) {
      return updateConfiguration({
        value: value
      });
    }
  });
}

frontend.contentElementTypes.register('textBlock', {
  component: TextBlock,
  customSelectionRect: true,
  supportsWrappingAroundFloats: true
});

var youtubeMatcher = /youtube\.com\/|youtu\.be\//;
var vimeoMatcher = /vimeo\.com\//;
var facebookMatcher = /facebook\.com\//;
function getProviderName(url) {
  if (youtubeMatcher.test(url)) {
    return 'youtube';
  } else if (vimeoMatcher.test(url)) {
    return 'vimeo';
  } else if (facebookMatcher.test(url)) {
    return 'facebook';
  }

  return null;
}

var styles$5 = {"embedPlayer":"VideoEmbed-module_embedPlayer__54NKG"};

var aspectRatios = {
  wide: 0.5625,
  narrow: 0.75,
  square: 1,
  portrait: 1.7777
};
function VideoEmbed(_ref) {
  var contentElementId = _ref.contentElementId,
      configuration = _ref.configuration;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var _useState = useState('unplayed'),
      _useState2 = _slicedToArray(_useState, 2),
      playerState = _useState2[0],
      setPlayerState = _useState2[1];

  var providerName = getProviderName(configuration.videoSource);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: isEditable && !isSelected ? 'none' : undefined
    }
  }, /*#__PURE__*/React.createElement(FitViewport, {
    aspectRatio: aspectRatios[configuration.aspectRatio || 'wide']
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, shouldLoad && /*#__PURE__*/React.createElement(PreparedPlayer, {
    playerState: playerState,
    setPlayerState: setPlayerState,
    contentElementId: contentElementId,
    configuration: configuration,
    providerName: providerName
  })), /*#__PURE__*/React.createElement(ThirdPartyOptOutInfo, {
    providerName: providerName,
    hide: playerState === 'playing'
  })))));
}

function PreparedPlayer(_ref2) {
  var contentElementId = _ref2.contentElementId,
      configuration = _ref2.configuration,
      playerState = _ref2.playerState,
      setPlayerState = _ref2.setPlayerState,
      providerName = _ref2.providerName;
  useAudioFocus({
    key: contentElementId,
    request: playerState === 'playing',
    onLost: function onLost() {
      setPlayerState('paused');
    }
  });
  useContentElementLifecycle({
    onInvisible: function onInvisible() {
      setPlayerState('paused');
    }
  });
  var posterImageFile = useFile({
    collectionName: 'imageFiles',
    permaId: configuration.posterId
  });
  var posterUrl = (posterImageFile === null || posterImageFile === void 0 ? void 0 : posterImageFile.isReady) && posterImageFile.urls.large; // React player does not re-create player when controls or config
  // prop changes. Ensure key changes to force React to re-mount
  // component.

  function keyFromConfiguration(config) {
    return [config.hideControls, config.hideInfo].join('');
  }

  var atmoHooks = useAtmoHooks(configuration.atmoDuringPlayback);

  function onPlay() {
    setPlayerState('playing');
    atmoHooks.before();
  }

  function onPauseOrEnd() {
    setPlayerState('paused');
    atmoHooks.after();
  }

  return /*#__PURE__*/React.createElement(ThirdPartyOptIn, {
    providerName: providerName
  }, function (_ref3) {
    var consentedHere = _ref3.consentedHere;
    return /*#__PURE__*/React.createElement(ReactPlayer, {
      className: styles$5.embedPlayer,
      key: keyFromConfiguration(configuration),
      url: configuration.videoSource,
      playing: playerState !== 'paused',
      onPlay: onPlay,
      onPause: onPauseOrEnd,
      onEnded: onPauseOrEnd,
      light: !consentedHere && playerState === 'unplayed' ? posterUrl || true : false,
      width: "100%",
      height: "100%",
      controls: !configuration.hideControls,
      config: {
        // ReactPlayer does not rerender when only
        // event handler props change. Since event
        // handlers depend on latest value of
        // atmoDuringPlayback, we force a render by
        // changing this unused config option.
        _unused: configuration.atmoDuringPlayback,
        youtube: {
          playerVars: {
            showinfo: !configuration.hideInfo
          }
        },
        vimeo: {
          playerOptions: {
            byline: !configuration.hideInfo
          }
        }
      }
    });
  });
}

function useAtmoHooks(atmoDuringPlayback) {
  var atmo = useAtmo();
  return useMemo(function () {
    var _ref4 = atmo.createMediaPlayerHooks(atmoDuringPlayback) || {
      before: function before() {},
      after: function after() {}
    },
        _before = _ref4.before,
        _after = _ref4.after;

    var timeout;
    return {
      before: function before() {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        } else {
          _before();
        }
      },
      after: function after() {
        // When seeking in the video pause and play events
        // fired. Prevent briefly fading the atmo back in.
        timeout = setTimeout(function () {
          _after();

          timeout = null;
        }, 1000);
      }
    };
  }, [atmo, atmoDuringPlayback]);
}

frontend.contentElementTypes.register('videoEmbed', {
  component: VideoEmbed,
  lifecycle: true,
  consentVendors: function consentVendors(_ref) {
    var configuration = _ref.configuration,
        t = _ref.t;
    var provider = getProviderName(configuration.videoSource);

    if (provider) {
      var prefix = 'pageflow_scrolled.public.video_embed.consent';
      return [{
        name: provider,
        displayName: t("".concat(prefix, ".").concat(provider, ".vendor_name")),
        description: t("".concat(prefix, ".").concat(provider, ".vendor_description")),
        paradigm: 'lazy opt-in'
      }];
    }

    return [];
  }
});

var styles$6 = {"darkContentSurfaceColor":"var(--theme-dark-content-surface-color, #101010)","lightContentSurfaceColor":"var(--theme-light-content-surface-color, #fff)","darkContentTextColor":"var(--theme-dark-content-text-color, #222)","lightContentTextColor":"var(--theme-light-content-text-color, #fff)","breakpoint-sm":"(min-width: 640px)","hidden":"ExternalLink-module_hidden__3jer0","link_item":"ExternalLink-module_link_item__Blypv","layout_center":"ExternalLink-module_layout_center__3NRpQ","link_title":"ExternalLink-module_link_title__FZJ-0","link_thumbnail":"ExternalLink-module_link_thumbnail__2_BHq","link_details":"ExternalLink-module_link_details__lRhKU","invert":"ExternalLink-module_invert__1zrgN","tooltip":"ExternalLink-module_tooltip__18MpC"};

function ExternalLink(props) {
  var _classNames2;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      hideTooltip = _useState2[0],
      setHideTooltip = _useState2[1];

  var layout = props.sectionProps.layout;

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var thumbnailImageFile = useFile({
    collectionName: 'imageFiles',
    permaId: props.thumbnail
  });
  var url = ensureAbsolute(props.url);

  var onClick = function onClick(event) {
    if (isEditable) {
      if (!props.open_in_new_tab || !isSelected) {
        event.preventDefault();
      }

      if (!props.open_in_new_tab && isSelected) {
        setHideTooltip(false);
      }
    }
  };

  var onMouseLeave = function onMouseLeave() {
    setHideTooltip(true);
  };

  function renderNewTabTooltip() {
    if (isEditable) {
      var onTooltipClick = function onTooltipClick() {
        window.open(url, '_blank');
        setHideTooltip(true);
      };

      return /*#__PURE__*/React.createElement("div", {
        className: classNames(_defineProperty({}, styles$6.hidden, hideTooltip), styles$6.tooltip),
        onClick: onTooltipClick
      }, t('pageflow_scrolled.inline_editing.external_links.open_in_new_tab_message'), /*#__PURE__*/React.createElement("span", null, t('pageflow_scrolled.inline_editing.external_links.open_in_new_tab')));
    }
  }

  return /*#__PURE__*/React.createElement("a", {
    className: classNames(styles$6.link_item, (_classNames2 = {}, _defineProperty(_classNames2, styles$6.invert, props.invert), _defineProperty(_classNames2, styles$6.layout_center, layout === 'center' || layout === 'centerRagged'), _classNames2)),
    href: url || 'about:blank',
    onClick: onClick,
    onMouseLeave: onMouseLeave,
    target: props.open_in_new_tab ? '_blank' : '_self',
    rel: props.open_in_new_tab ? 'noopen noreferrer' : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$6.link_thumbnail
  }, /*#__PURE__*/React.createElement(Image, {
    imageFile: thumbnailImageFile,
    load: props.loadImages,
    variant: "linkThumbnailLarge"
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$6.link_details
  }, /*#__PURE__*/React.createElement("p", {
    className: styles$6.link_title
  }, props.title), /*#__PURE__*/React.createElement("p", {
    className: styles$6.link_desc
  }, props.description)), renderNewTabTooltip());
}
ExternalLink.defaultProps = {
  sectionProps: {}
};

function ensureAbsolute(url) {
  if (url.match(/^(https?:)?\/\//)) {
    return url;
  } else {
    return "http://".concat(url);
  }
}

var styles$7 = {"contentColorScope":"colors-module_contentColorScope__3zLO1","ext_links_container":"ExternalLinkList-module_ext_links_container__16IIo scope-externalLinks colors-module_contentColorScope__3zLO1"};

function ExternalLinkList(props) {
  var linkList = props.configuration.links || [];

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var darkBackground = useDarkBackground();
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$7.ext_links_container, props.configuration.variant && "scope-externalLinkList-".concat(props.configuration.variant))
  }, linkList.map(function (link, index) {
    return /*#__PURE__*/React.createElement(ExternalLink, Object.assign({}, link, {
      key: link.id,
      invert: !darkBackground,
      sectionProps: props.sectionProps,
      loadImages: shouldLoad
    }));
  }));
}

frontend.contentElementTypes.register('externalLinkList', {
  component: ExternalLinkList,
  lifecycle: true
});

function useIframeHeight(url) {
  var _useState = useState('400px'),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  useEffect(function () {
    window.addEventListener('message', receive);

    function receive(event) {
      if (typeof event.data['datawrapper-height'] !== 'undefined') {
        for (var chartId in event.data['datawrapper-height']) {
          if ((url === null || url === void 0 ? void 0 : url.indexOf(chartId)) > -1) {
            setHeight(event.data['datawrapper-height'][chartId] + 'px');
          }
        }
      }
    }

    return function () {
      return window.removeEventListener('message', receive);
    };
  }, [url]);
  return height;
}

var styles$8 = {"container":"DataWrapperChart-module_container__2eZ15"};

function DataWrapperChart(_ref) {
  var configuration = _ref.configuration;

  var _useI18n = useI18n(),
      t = _useI18n.t;

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var height = useIframeHeight(configuration.url); // remove url protocol, so that it is selected by the browser itself

  var srcURL = '';

  if (configuration.url) {
    srcURL = configuration.url.replace(/http(s|):/, '');
  }

  var backgroundColor = configuration.backgroundColor || '#323d4d';
  return /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$8.container,
    style: {
      pointerEvents: isEditable && !isSelected ? 'none' : undefined,
      backgroundColor: backgroundColor,
      color: textColorForBackgroundColor(backgroundColor),
      height: height
    },
    "data-percy": "hide"
  }, /*#__PURE__*/React.createElement(ThirdPartyOptIn, {
    providerName: "datawrapper"
  }, shouldLoad && renderIframe(srcURL, configuration.title || t('pageflow_scrolled.public.chart.default_title'))), /*#__PURE__*/React.createElement(DatawrapperOptOutInfo, {
    providerName: "datawrapper"
  }))));
}

function DatawrapperOptOutInfo(props) {
  if (!features.isEnabled('datawrapper_chart_embed_opt_in')) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ThirdPartyOptOutInfo, Object.assign({
    providerName: "datawrapper"
  }, props));
}

function renderIframe(url, title) {
  if (!url) {
    return null;
  }

  return /*#__PURE__*/React.createElement("iframe", {
    src: url,
    title: title,
    scrolling: "no",
    allowFullScreen: true,
    mozallowfullscreen: "true",
    webkitallowfullscreen: "true"
  });
}

frontend.contentElementTypes.register('dataWrapperChart', {
  component: DataWrapperChart,
  lifecycle: true,
  consentVendors: function consentVendors(_ref) {
    var configuration = _ref.configuration,
        t = _ref.t;
    var prefix = 'pageflow_scrolled.public.chart';
    return [{
      name: 'datawrapper',
      displayName: t("".concat(prefix, ".consent_vendor_name")),
      description: t("".concat(prefix, ".consent_vendor_description")),
      paradigm: features.isEnabled('datawrapper_chart_embed_opt_in') ? 'lazy opt-in' : 'skip'
    }];
  }
});

function useAutoCruising(_ref) {
  var viewerRef = _ref.viewerRef,
      onCancel = _ref.onCancel;
  var autoCruisingRef = useRef(false);
  var rafIdRef = useRef();
  var lastYawRef = useRef(null);
  var start = useCallback(function () {
    var viewer = viewerRef.current;
    var start = new Date().getTime();
    var pitch = viewer.getPitch();
    var yaw = viewer.getYaw();
    var delta = 0;

    if (!autoCruisingRef.current) {
      rafIdRef.current = window.requestAnimationFrame(tick);
      autoCruisingRef.current = true;
    }

    function tick() {
      delta = new Date().getTime() - start;

      if (autoCruisingRef.current && lastYawRef.current !== null && (Math.abs(pitch - viewer.getPitch()) > 0.1 || Math.abs(lastYawRef.current - viewer.getYaw()) > 0.1)) {
        autoCruisingRef.current = false;
        lastYawRef.current = null;
        onCancel();
        return;
      }

      lastYawRef.current = yaw - delta / 1000 % 360;
      viewer.lookAt({
        yaw: lastYawRef.current,
        pitch: pitch
      }, 0);
      autoCruisingRef.current && (rafIdRef.current = window.requestAnimationFrame(tick));
    }
  }, [viewerRef, onCancel]);
  var stop = useCallback(function () {
    window.cancelAnimationFrame(rafIdRef.current);
    autoCruisingRef.current = false;
    lastYawRef.current = null;
  }, []);
  useEffect(function () {
    return stop;
  }, [stop]);
  return [start, stop];
}

function VrImage(_ref) {
  var configuration = _ref.configuration,
      contentElementWidth = _ref.contentElementWidth;

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var imageFile = useFileWithInlineRights({
    configuration: configuration,
    collectionName: 'imageFiles',
    propertyName: 'image'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: isEditable && !isSelected ? 'none' : undefined
    }
  }, /*#__PURE__*/React.createElement(FitViewport, {
    aspectRatio: contentElementWidth === contentElementWidths.full ? 0.5 : 0.75
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, renderLazyPanorama(configuration, imageFile, shouldLoad), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "insideElement",
    items: [{
      file: imageFile,
      label: 'image'
    }]
  })))), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "afterElement",
    items: [{
      file: imageFile,
      label: 'image'
    }]
  })));
}

function renderLazyPanorama(configuration, imageFile, shouldLoad) {
  if (shouldLoad && imageFile && imageFile.isReady) {
    return /*#__PURE__*/React.createElement(AutoCruisingPanorama, {
      imageFile: imageFile,
      initialYaw: configuration.initialYaw,
      initialPitch: configuration.initialPitch
    });
  }
}

function AutoCruisingPanorama(_ref2) {
  var imageFile = _ref2.imageFile,
      initialYaw = _ref2.initialYaw,
      initialPitch = _ref2.initialPitch;
  var viewerRef = useRef();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hidePanoramaIndicator = _useState2[0],
      setHidePanoramaIndicator = _useState2[1];

  var _useAutoCruising = useAutoCruising({
    viewerRef: viewerRef,
    onCancel: function onCancel() {
      return setHidePanoramaIndicator(true);
    }
  }),
      _useAutoCruising2 = _slicedToArray(_useAutoCruising, 2),
      startAutoCruising = _useAutoCruising2[0],
      stopAutoCruising = _useAutoCruising2[1];

  useContentElementLifecycle({
    onActivate: function onActivate() {
      if (viewerRef.current) {
        startAutoCruising();
      }
    }
  });
  return /*#__PURE__*/React.createElement(Panorama, {
    imageFile: imageFile,
    initialYaw: initialYaw,
    initialPitch: initialPitch,
    viewerRef: viewerRef,
    hidePanoramaIndicator: hidePanoramaIndicator,
    onReady: startAutoCruising,
    onFullscreen: stopAutoCruising
  });
}

frontend.contentElementTypes.register('vrImage', {
  component: VrImage,
  lifecycle: true
});

var styles$9 = {"wrapper":"IframeEmbed-module_wrapper__3w_LN","iframe":"IframeEmbed-module_iframe__3QVCA","scale-p33":"IframeEmbed-module_scale-p33__MRjVy","scale-p50":"IframeEmbed-module_scale-p50__1EKxu","scale-p75":"IframeEmbed-module_scale-p75__1yT4D"};

var aspectRatios$1 = {
  wide: 0.5625,
  narrow: 0.75,
  square: 1,
  portrait: 1.7777
};
function IframeEmbed(_ref) {
  var configuration = _ref.configuration;

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var portraitOrientation = usePortraitOrientation();
  var aspectRatio = portraitOrientation && configuration.portraitAspectRatio ? configuration.portraitAspectRatio : configuration.aspectRatio;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$9.wrapper,
    style: {
      pointerEvents: isEditable && !isSelected ? 'none' : undefined
    }
  }, /*#__PURE__*/React.createElement(FitViewport, {
    aspectRatio: aspectRatios$1[aspectRatio || 'wide'],
    opaque: utils.isBlank(configuration.source)
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(ContentElementFigure, {
    configuration: configuration
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, /*#__PURE__*/React.createElement(ThirdPartyOptIn, null, shouldLoad && /*#__PURE__*/React.createElement("iframe", {
    className: classNames(styles$9.iframe, styles$9["scale-".concat(configuration.scale)]),
    title: configuration.title,
    src: configuration.source
  }))), /*#__PURE__*/React.createElement(OptOutInfo, {
    configuration: configuration
  })))));
}

function OptOutInfo(_ref2) {
  var configuration = _ref2.configuration;

  if (!configuration.requireConsent) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ThirdPartyOptOutInfo, null);
}

frontend.contentElementTypes.register('iframeEmbed', {
  component: IframeEmbed,
  lifecycle: true
});

var styles$a = {"wrapper":"Placeholder-module_wrapper__jRFYE","row":"Placeholder-module_row__1SBRB","item":"Placeholder-module_item__RozmQ","load":"Placeholder-module_load__uFpxr","avatar":"Placeholder-module_avatar__2VeHz Placeholder-module_item__RozmQ","info":"Placeholder-module_info__37csK","name":"Placeholder-module_name__2T6as Placeholder-module_item__RozmQ","handle":"Placeholder-module_handle__2WwoF Placeholder-module_item__RozmQ","text":"Placeholder-module_text__DWLME Placeholder-module_item__RozmQ"};

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
var Icon = (function (_ref) {
  var _ref$styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return /*#__PURE__*/React.createElement("svg", _extends$2({
    viewBox: "0 0 512 512",
    "aria-hidden": "true"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z"
  }));
});

function Placeholder(_ref) {
  var children = _ref.children,
      minHeight = _ref.minHeight;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$a.wrapper,
    style: {
      minHeight: minHeight
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$a.row
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$a.avatar
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$a.info
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$a.name
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$a.handle
  })), /*#__PURE__*/React.createElement(Icon, {
    width: 24,
    height: 24
  })), children || /*#__PURE__*/React.createElement("div", {
    className: styles$a.text
  }));
}

var styles$b = {"loadingContainer":"TwitterEmbed-module_loadingContainer__3Ozs_","container":"TwitterEmbed-module_container__380cX"};

function TwitterEmbed(_ref) {
  var configuration = _ref.configuration;
  var url = configuration.url,
      hideConversation = configuration.hideConversation,
      hideMedia = configuration.hideMedia;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      minHeight = _useState2[0],
      setMinHeight = _useState2[1];

  var key = [url, hideConversation, hideMedia].join('-');
  var onLoad = useCallback(function (_ref2) {
    var height = _ref2.height;
    setMinHeight(_defineProperty({}, key, height));
  }, [key]);
  return /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: isEditable && !isSelected ? 'none' : undefined
    }
  }, shouldLoad ? /*#__PURE__*/React.createElement(ThirdPartyOptIn, {
    providerName: "twitter",
    icon: false,
    wrapper: function wrapper(children) {
      return /*#__PURE__*/React.createElement(Placeholder, null, children);
    }
  }, /*#__PURE__*/React.createElement(Tweet, {
    key: key,
    url: url,
    hideConversation: hideConversation,
    hideMedia: hideMedia,
    minHeight: minHeight[key],
    onLoad: onLoad
  })) : /*#__PURE__*/React.createElement(Placeholder, {
    minHeight: minHeight[key]
  }), /*#__PURE__*/React.createElement(ThirdPartyOptOutInfo, {
    providerName: "twitter"
  })));
}

function scriptLoaded() {
  var promise = new Promise(function (resolve) {
    var script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.addEventListener('load', resolve);
    document.head.appendChild(script);
  });
  return promise;
}

function Tweet(_ref3) {
  var url = _ref3.url,
      hideConversation = _ref3.hideConversation,
      hideMedia = _ref3.hideMedia,
      minHeight = _ref3.minHeight,
      onLoad = _ref3.onLoad;
  var ref = useRef(null);
  var tweetId = url ? url.split('/')[5] : undefined;

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loaded = _useState4[0],
      setLoaded = _useState4[1];

  useEffect(function () {
    var isComponentMounted = true;
    var options = {
      cards: hideMedia ? "hidden" : "",
      conversation: hideConversation ? "none" : ""
    };
    scriptLoaded().then(function () {
      if (window.twttr.widgets && tweetId) {
        if (isComponentMounted) {
          if (window.twttr.widgets['createTweetEmbed']) {
            window.twttr.widgets.createTweet(tweetId, ref.current, options).then(function () {
              var _ref$current;

              setLoaded(true);
              onLoad({
                height: (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.clientHeight
              });
            });
          }
        }
      }
    });
    return function () {
      return isComponentMounted = false;
    };
  }, [hideMedia, hideConversation, tweetId, onLoad]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !loaded && /*#__PURE__*/React.createElement(Placeholder, {
    minHeight: minHeight
  }), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: classNames(styles$b.container, _defineProperty({}, styles$b.loadingContainer, !loaded))
  }));
}

frontend.contentElementTypes.register('twitterEmbed', {
  component: TwitterEmbed,
  lifecycle: true,
  consentVendors: function consentVendors(_ref) {
    var t = _ref.t;
    var prefix = 'pageflow_scrolled.public.twitter';
    return [{
      name: 'twitter',
      displayName: t("".concat(prefix, ".consent_vendor_name")),
      description: t("".concat(prefix, ".consent_vendor_description")),
      paradigm: 'lazy opt-in'
    }];
  }
});

var styles$c = {"contentLinkColor":"var(--content-link-color)","details":"Question-module_details__3FxH-","answer":"Question-module_answer__2jMt6","layout-centerRagged":"Question-module_layout-centerRagged__1hovs"};

function Question(_ref) {
  var configuration = _ref.configuration,
      contentElementId = _ref.contentElementId,
      sectionProps = _ref.sectionProps;
  var updateConfiguration = useContentElementConfigurationUpdate();

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable,
      isSelected = _useContentElementEdi.isSelected;

  return /*#__PURE__*/React.createElement("details", {
    open: configuration.expandByDefault || isEditable && isSelected,
    className: classNames(styles$c.details, styles$c["layout-".concat(sectionProps.layout)])
  }, /*#__PURE__*/React.createElement("summary", {
    onClick: isEditable ? function (event) {
      return event.preventDefault();
    } : undefined
  }, /*#__PURE__*/React.createElement(ThemeIcon, {
    name: "expand"
  }), /*#__PURE__*/React.createElement(Text, {
    scaleCategory: "question"
  }, /*#__PURE__*/React.createElement(EditableInlineText, {
    value: configuration.question,
    onChange: function onChange(question) {
      return updateConfiguration({
        question: question
      });
    },
    hyphens: "none",
    placeholder: t('pageflow_scrolled.inline_editing.type_question')
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EditableText, {
    value: configuration.answer,
    contentElementId: contentElementId,
    className: styles$c.answer,
    onChange: function onChange(answer) {
      return updateConfiguration({
        answer: answer
      });
    },
    onlyParagraphs: true,
    hyphens: "none",
    placeholder: t('pageflow_scrolled.inline_editing.type_answer')
  })));
}

frontend.contentElementTypes.register('question', {
  component: Question
});

var styles$d = {"contentLinkColor":"var(--content-link-color)","wrapper":"Counter-module_wrapper__3XTil","number":"Counter-module_number__1Y4AV","centerRagged":"Counter-module_centerRagged__3Va0Y","center":"Counter-module_center__1SCJY","animation-fadeIn":"Counter-module_animation-fadeIn__3Hyky","animation-fadeIn-active":"Counter-module_animation-fadeIn-active__16DIk","animation-fadeInFromBelow":"Counter-module_animation-fadeInFromBelow__3l1qX","animation-fadeInFromAbove":"Counter-module_animation-fadeInFromAbove__3iGf-","animation-fadeInFromAbove-active":"Counter-module_animation-fadeInFromAbove-active__37UsW","animation-fadeInFromBelow-active":"Counter-module_animation-fadeInFromBelow-active__2CSjv","animation-fadeInScaleUp":"Counter-module_animation-fadeInScaleUp__1ngk5","animation-fadeInScaleDown":"Counter-module_animation-fadeInScaleDown__SpNGu","animation-fadeInScaleUp-active":"Counter-module_animation-fadeInScaleUp-active__1GEXn","animation-fadeInScaleDown-active":"Counter-module_animation-fadeInScaleDown-active__3gaYM"};

function Counter(_ref) {
  var configuration = _ref.configuration,
      contentElementId = _ref.contentElementId,
      contentElementWidth = _ref.contentElementWidth,
      sectionProps = _ref.sectionProps;
  var updateConfiguration = useContentElementConfigurationUpdate();
  var locale = useLocale();

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  var targetValue = configuration.targetValue || 0;
  var decimalPlaces = configuration.decimalPlaces || 0;
  var startValue = configuration.startValue || 0;
  var countingDuration = countingDurations[configuration.countingSpeed];

  var _useState = useState(countingDuration > 0 ? startValue : targetValue),
      _useState2 = _slicedToArray(_useState, 2),
      currentValue = _useState2[0],
      setCurrentValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      animated = _useState4[0],
      setAnimated = _useState4[1];

  var intervalRef = useRef();
  var timeoutRef = useRef();

  var _useContentElementEdi = useContentElementEditorState(),
      isEditable = _useContentElementEdi.isEditable;

  var animate = useCallback(function () {
    setAnimated(true);

    if (!intervalRef.current && countingDuration > 0) {
      var startTime = new Date().getTime();
      var ease = configuration.entranceAnimation && configuration.entranceAnimation !== 'none' ? easeOut : easeInOut;
      intervalRef.current = setInterval(function () {
        var t = (new Date().getTime() - startTime) / countingDuration;

        if (t < 1) {
          setCurrentValue(startValue + (targetValue - startValue) * ease(t));
        } else {
          clearInterval(intervalRef.current);
          setCurrentValue(targetValue);
        }
      }, 10);
    }
  }, [targetValue, startValue, countingDuration, configuration.entranceAnimation]);
  var resetAnimation = useCallback(function () {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCurrentValue(countingDuration > 0 ? startValue : targetValue);
    setAnimated(false);
  }, [startValue, targetValue, countingDuration]);
  useEffect(function () {
    if (isEditable) {
      resetAnimation();
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(animate, 500);
    }
  }, [animate, resetAnimation, isEditable]);
  useContentElementLifecycle({
    onActivate: function onActivate() {
      animate();
    },
    onInvisible: function onInvisible() {
      if (isEditable) {
        resetAnimation();
      }
    }
  });

  function format(value) {
    var localeString = value.toLocaleString(locale, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });
    var unit = configuration.unit || '';
    return configuration.unitPlacement === 'leading' ? "".concat(unit).concat(localeString) : "".concat(localeString).concat(unit);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(_defineProperty({}, styles$d.center, contentElementWidth > contentElementWidths.md))
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$d.wrapper, _defineProperty({}, styles$d.centerRagged, sectionProps.layout === 'centerRagged'))
  }, /*#__PURE__*/React.createElement(Text, {
    scaleCategory: numberScaleCategories[configuration.textSize || 'medium']
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames("typography-counter-".concat(configuration.typographyVariant), styles$d.number, styles$d["animation-".concat(configuration.entranceAnimation)], _defineProperty({}, styles$d["animation-".concat(configuration.entranceAnimation, "-active")], animated)),
    style: {
      '--counting-duration': "".concat(countingDuration || 1000, "ms"),
      '--palette-color': paletteColor(configuration.numberColor)
    }
  }, format(currentValue))), /*#__PURE__*/React.createElement(EditableText, {
    value: configuration.description,
    contentElementId: contentElementId,
    className: styles$d.description,
    onChange: function onChange(description) {
      return updateConfiguration({
        description: description
      });
    },
    onlyParagraphs: true,
    scaleCategory: "counterDescription",
    placeholder: t('pageflow_scrolled.inline_editing.type_description')
  })));
}
var numberScaleCategories = {
  verySmall: 'counterNumber-xs',
  small: 'counterNumber-sm',
  medium: 'counterNumber-md',
  large: 'counterNumber-lg'
};
var countingDurations = {
  none: 0,
  fast: 500,
  medium: 2000,
  slow: 5000
};

function easeInOut(t) {
  t = t * 2;
  if (t < 1) return Math.pow(t, 2) / 2;
  t = t - 1;
  return t - Math.pow(t, 2) / 2 + 1 / 2;
}

function easeOut(t) {
  return (t - Math.pow(t, 2) / 2) * 2;
}

frontend.contentElementTypes.register('counter', {
  component: Counter,
  lifecycle: true
});

var styles$e = {"breakpoint-sm":"(min-width: 640px)","contentLinkColor":"var(--content-link-color)","figure":"Quote-module_figure__1Q3tJ","design-largeCentered":"Quote-module_design-largeCentered__2f6qW","text":"Quote-module_text__C0md2","design-largeHanging":"Quote-module_design-largeHanging__1TVQh","design-hanging":"Quote-module_design-hanging__4aDVU","centerRagged":"Quote-module_centerRagged__1CeFH","maskedMark":"Quote-module_maskedMark__2n08e","attribution":"Quote-module_attribution__3iXxu"};

function Quote(_ref) {
  var _theme$options$proper, _theme$options$proper2;

  var configuration = _ref.configuration,
      contentElementId = _ref.contentElementId,
      sectionProps = _ref.sectionProps;
  var updateConfiguration = useContentElementConfigurationUpdate();

  var _useContentElementEdi = useContentElementEditorState(),
      isSelected = _useContentElementEdi.isSelected;

  var theme = useTheme();

  var _useI18n = useI18n({
    locale: 'ui'
  }),
      t = _useI18n.t;

  var design = configuration.variant ? configuration.variant.split('-')[0] : theme.options.quoteDesign;
  return /*#__PURE__*/React.createElement("figure", {
    className: classNames(styles$e.figure, styles$e["design-".concat(design || 'largeHanging')], "scope-quote-".concat(configuration.variant), _defineProperty({}, styles$e.maskedMark, (_theme$options$proper = theme.options.properties) === null || _theme$options$proper === void 0 ? void 0 : (_theme$options$proper2 = _theme$options$proper.root) === null || _theme$options$proper2 === void 0 ? void 0 : _theme$options$proper2.quoteLeftMarkMaskImage), _defineProperty({}, styles$e.centerRagged, sectionProps.layout === 'centerRagged')),
    style: {
      '--palette-color': paletteColor(configuration.color)
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    className: styles$e.text
  }, /*#__PURE__*/React.createElement(EditableText, {
    value: configuration.text,
    contentElementId: contentElementId,
    onChange: function onChange(text) {
      return updateConfiguration({
        text: text
      });
    },
    onlyParagraphs: true,
    scaleCategory: getTextScaleCategory(configuration)
  })), (isSelected || !utils.isBlankEditableTextValue(configuration.attribution || [])) && /*#__PURE__*/React.createElement("figcaption", {
    className: styles$e.attribution
  }, /*#__PURE__*/React.createElement(EditableText, {
    value: configuration.attribution,
    contentElementId: contentElementId,
    onChange: function onChange(attribution) {
      return updateConfiguration({
        attribution: attribution
      });
    },
    onlyParagraphs: true,
    scaleCategory: "quoteAttribution",
    placeholder: t('pageflow_scrolled.inline_editing.type_attribution')
  })));
}

function getTextScaleCategory(configuration) {
  switch (configuration.textSize) {
    case 'large':
      return 'quoteText-lg';

    case 'small':
      return 'quoteText-sm';

    case 'verySmall':
      return 'quoteText-xs';

    default:
      return 'quoteText-md';
  }
}

frontend.contentElementTypes.register('quote', {
  component: Quote
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var styles$f = {"button":"ScrollButton-module_button__3DeL7","left":"ScrollButton-module_left__3uACk","right":"ScrollButton-module_right__25CLO","disabled":"ScrollButton-module_disabled__3fQR1","icon":"ScrollButton-module_icon__35w1l"};

var size = 40;
function ScrollButton(_ref) {
  var direction = _ref.direction,
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement("button", {
    className: classNames(styles$f.button, styles$f[direction], _defineProperty({}, styles$f.disabled, disabled)),
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$f.icon
  }, /*#__PURE__*/React.createElement(ThemeIcon, {
    name: direction === 'left' ? 'arrowLeft' : 'arrowRight',
    width: size,
    height: size
  })));
}

function useIntersectionObserver(_ref) {
  var threshold = _ref.threshold,
      onVisibleIndexChange = _ref.onVisibleIndexChange;
  var containerRef = useRef();
  var childRefs = useRef([]);
  var observerRef = useRef();
  useEffect(function () {
    var observer = observerRef.current = new IntersectionObserver(function (entries) {
      var containerElement = containerRef.current;
      entries.forEach(function (entry) {
        var entryIndex = Array.from(containerElement.children).findIndex(function (child) {
          return child === entry.target;
        });

        if (entry.isIntersecting) {
          onVisibleIndexChange(entryIndex);
        }
      });
    }, {
      root: containerRef.current,
      threshold: threshold
    });
    childRefs.current.forEach(function (child) {
      if (child) {
        observer.observe(child);
      }
    });
    return function () {
      observer.disconnect();
    };
  }, [threshold, onVisibleIndexChange]);

  var setChildRef = function setChildRef(index) {
    return function (ref) {
      if (observerRef.current) {
        if (ref) {
          observerRef.current.observe(ref);
        } else {
          observerRef.current.unobserve(childRefs.current[index]);
        }
      }

      childRefs.current[index] = ref;
    };
  };

  return {
    containerRef: containerRef,
    setChildRef: setChildRef
  };
}

var styles$g = {"lightContentTextColor":"var(--theme-light-content-text-color, #fff)","contentLinkColor":"var(--content-link-color)","wrapper":"ImageGallery-module_wrapper__2H9en","wide":"ImageGallery-module_wide__xGLuJ","customMargin":"ImageGallery-module_customMargin__1VxM6","button":"ImageGallery-module_button__35bDf","leftButton":"ImageGallery-module_leftButton__3V-J6 ImageGallery-module_button__35bDf","rightButton":"ImageGallery-module_rightButton__ba0q5 ImageGallery-module_button__35bDf","items":"ImageGallery-module_items__1q4QG","item":"ImageGallery-module_item__iqvfP","current":"ImageGallery-module_current__2Mm11","figure":"ImageGallery-module_figure__3zkJb","placeholder":"ImageGallery-module_placeholder__39Vq4"};

function ImageGallery(_ref) {
  var configuration = _ref.configuration,
      contentElementId = _ref.contentElementId,
      contentElementWidth = _ref.contentElementWidth,
      customMargin = _ref.customMargin;

  var _useState = useState(-1),
      _useState2 = _slicedToArray(_useState, 2),
      visibleIndex = _useState2[0],
      setVisibleIndex = _useState2[1];

  var isPhonePlatform = usePhonePlatform();
  return /*#__PURE__*/React.createElement(FullscreenViewer, {
    contentElementId: contentElementId,
    renderChildren: function renderChildren(_ref2) {
      var enterFullscreen = _ref2.enterFullscreen,
          isFullscreen = _ref2.isFullscreen;
      return /*#__PURE__*/React.createElement(Scroller, {
        customMargin: customMargin,
        configuration: configuration,
        contentElementWidth: contentElementWidth,
        controlled: isFullscreen,
        displayFullscreenToggle: !isPhonePlatform && contentElementWidth !== contentElementWidths.full && configuration.enableFullscreenOnDesktop,
        visibleIndex: visibleIndex,
        setVisibleIndex: setVisibleIndex,
        onFullscreenEnter: enterFullscreen
      });
    },
    renderFullscreenChildren: function renderFullscreenChildren(_ref3) {
      var exitFullscreen = _ref3.exitFullscreen;
      return /*#__PURE__*/React.createElement(Scroller, {
        configuration: configuration,
        contentElementWidth: contentElementWidth,
        visibleIndex: visibleIndex,
        setVisibleIndex: setVisibleIndex,
        displayFullscreenToggle: false,
        onBump: exitFullscreen,
        onFullscreenExit: exitFullscreen
      });
    }
  });
}

function Scroller(_ref4) {
  var visibleIndex = _ref4.visibleIndex,
      setVisibleIndex = _ref4.setVisibleIndex,
      displayFullscreenToggle = _ref4.displayFullscreenToggle,
      customMargin = _ref4.customMargin,
      onFullscreenEnter = _ref4.onFullscreenEnter,
      onFullscreenExit = _ref4.onFullscreenExit,
      onBump = _ref4.onBump,
      configuration = _ref4.configuration,
      contentElementWidth = _ref4.contentElementWidth,
      controlled = _ref4.controlled;
  var lastVisibleIndex = useRef(null);

  var _useContentElementEdi = useContentElementEditorState(),
      isSelected = _useContentElementEdi.isSelected,
      isEditable = _useContentElementEdi.isEditable;

  var items = configuration.items || [];

  if (!items.length && isEditable) {
    items = [{
      id: 1,
      placeholder: true
    }];
  }

  var onVisibleIndexChange = useCallback(function (index) {
    if (!controlled) {
      lastVisibleIndex.current = index;
      setVisibleIndex(index);
    }
  }, [controlled, setVisibleIndex]);

  var _useIntersectionObser = useIntersectionObserver({
    onVisibleIndexChange: onVisibleIndexChange,
    threshold: 0.7
  }),
      scrollerRef = _useIntersectionObser.containerRef,
      setChildRef = _useIntersectionObser.setChildRef;

  useEffect(function () {
    if (lastVisibleIndex.current !== visibleIndex && visibleIndex >= 0 && (controlled || lastVisibleIndex.current === null)) {
      lastVisibleIndex.current = visibleIndex;
      var scroller = scrollerRef.current;
      var item = scroller.children[visibleIndex];
      scroller.style.scrollBehavior = 'auto';
      scroller.scrollTo(Math.abs(scroller.offsetLeft - item.offsetLeft), 0);
      scroller.style.scrollBehavior = null;
    }
  }, [visibleIndex, scrollerRef, controlled]);

  function scrollBy(delta) {
    var scroller = scrollerRef.current;
    var child = scroller.children[visibleIndex + delta];

    if (child) {
      scrollerRef.current.scrollTo(child.offsetLeft - scroller.offsetLeft, 0);
    }
  }

  function handleClick(event) {
    if (isEditable && !isSelected) {
      return;
    }

    var rect = scrollerRef.current.getBoundingClientRect();

    if ((event.pageX - rect.x) / rect.width < 0.5) {
      if (visibleIndex > 0) {
        scrollBy(-1);
      } else if (onBump) {
        onBump();
      }
    } else {
      if (visibleIndex < items.length - 1) {
        scrollBy(1);
      } else if (onBump) {
        onBump();
      }
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$g.wrapper, _defineProperty({}, styles$g.wide, contentElementWidth === contentElementWidths.lg || contentElementWidth === contentElementWidths.xl), _defineProperty({}, styles$g.customMargin, customMargin))
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$g.leftButton
  }, /*#__PURE__*/React.createElement(ScrollButton, {
    direction: "left",
    disabled: visibleIndex <= 0,
    onClick: function onClick() {
      return scrollBy(-1);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$g.rightButton
  }, /*#__PURE__*/React.createElement(ScrollButton, {
    direction: "right",
    disabled: visibleIndex >= items.length - 1,
    onClick: function onClick() {
      return scrollBy(1);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles$g.items,
    ref: scrollerRef
  }, items.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Item, {
      key: item.id,
      ref: setChildRef(index),
      item: item,
      current: index === visibleIndex,
      captions: configuration.captions || {},
      onClick: handleClick
    }, displayFullscreenToggle && /*#__PURE__*/React.createElement(ToggleFullscreenCornerButton, {
      isFullscreen: false,
      onEnter: onFullscreenEnter
    }));
  })));
}

var Item = forwardRef(function (_ref5, ref) {
  var _classNames3;

  var item = _ref5.item,
      captions = _ref5.captions,
      current = _ref5.current,
      onClick = _ref5.onClick,
      children = _ref5.children;
  var updateConfiguration = useContentElementConfigurationUpdate();

  var _useContentElementLif = useContentElementLifecycle(),
      shouldLoad = _useContentElementLif.shouldLoad;

  var caption = captions[item.id];
  var imageFile = useFileWithInlineRights({
    configuration: item,
    collectionName: 'imageFiles',
    propertyName: 'image'
  });

  var handleCaptionChange = function handleCaptionChange(caption) {
    updateConfiguration({
      captions: _objectSpread2(_objectSpread2({}, captions), {}, _defineProperty({}, item.id, caption))
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$g.item, (_classNames3 = {}, _defineProperty(_classNames3, styles$g.current, current), _defineProperty(_classNames3, styles$g.placeholder, item.placeholder), _classNames3)),
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$g.figure
  }, /*#__PURE__*/React.createElement(FitViewport, {
    file: imageFile,
    aspectRatio: imageFile ? undefined : 0.75,
    scale: 0.8,
    opaque: !imageFile
  }, /*#__PURE__*/React.createElement(ContentElementBox, null, /*#__PURE__*/React.createElement(Figure, {
    caption: caption,
    onCaptionChange: handleCaptionChange,
    addCaptionButtonVisible: current && !item.placeholder,
    addCaptionButtonPosition: "inside"
  }, /*#__PURE__*/React.createElement(FitViewport.Content, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Image, {
    imageFile: imageFile,
    load: shouldLoad
  })), children, /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "insideElement",
    items: [{
      file: imageFile,
      label: 'image'
    }]
  })))), /*#__PURE__*/React.createElement(InlineFileRights, {
    context: "afterElement",
    items: [{
      file: imageFile,
      label: 'image'
    }]
  }))));
});

frontend.contentElementTypes.register('imageGallery', {
  component: ImageGallery,
  lifecycle: true,
  customMargin: true
});
