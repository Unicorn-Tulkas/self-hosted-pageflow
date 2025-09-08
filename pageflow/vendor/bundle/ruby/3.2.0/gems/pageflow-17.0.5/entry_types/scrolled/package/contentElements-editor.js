import I18n from 'i18n-js';
import { editor, InlineFileRightsMenuItem, NoOptionsHintView, buttonStyles } from 'pageflow-scrolled/editor';
import { contentElementWidths, utils } from 'pageflow-scrolled/frontend';
import { SelectInputView, SeparatorView, LabelOnlyView, ColorInputView, UrlInputView, CheckBoxInputView as CheckBoxInputView$1, TextInputView, SliderInputView, ConfigurationEditorView, cssModulesUtils, NumberInputView } from 'pageflow/ui';
import { InfoBoxView, FileInputView, CheckBoxInputView, ColorInputView as ColorInputView$1, editor as editor$1, transientReferences, ListView, SliderInputView as SliderInputView$1, SelectInputView as SelectInputView$1, EnumTableCellView } from 'pageflow/editor';
import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import _ from 'underscore';

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

var img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M448 448c0 17.69-14.33 32-32 32h-96c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-144h-224v144H128c17.67 0 32 14.31 32 32s-14.33 32-32 32H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h16v-320H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32H112v112h224v-112H320c-17.67 0-32-14.31-32-32s14.33-32 32-32h96c17.67 0 32 14.31 32 32s-14.33 32-32 32h-16v320H416C433.7 416 448 430.3 448 448z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('heading', {
  pictogram: img,
  supportedPositions: ['inline'],
  supportedWidthRange: ['md', 'xl'],
  defaultConfig: {
    width: contentElementWidths.xl,
    marginTop: 'none'
  },
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry;
    this.listenTo(this.model, 'change:hyphens', this.refresh);
    var modelDelegator = entry.createLegacyTypographyVariantDelegator({
      model: this.model,
      paletteColorPropertyName: 'color'
    });
    this.tab('general', function () {
      this.input('textSize', SelectInputView, {
        values: ['auto', 'large', 'medium', 'small']
      });
      this.group('ContentElementTypographyVariant', {
        entry: entry,
        model: modelDelegator,
        getPreviewConfiguration: function getPreviewConfiguration(configuration, typographyVariant) {
          return _objectSpread2(_objectSpread2({}, configuration), {}, {
            textSize: 'small',
            typographyVariant: typographyVariant
          });
        }
      });
      this.group('PaletteColor', {
        entry: entry,
        model: modelDelegator,
        propertyName: 'color'
      });
      this.input('entranceAnimation', SelectInputView, {
        values: ['none', 'fadeInSlow', 'fadeIn', 'fadeInFast']
      });
      this.input('hyphens', SelectInputView, {
        values: ['auto', 'manual']
      });

      if (this.model.get('hyphens') === 'manual') {
        this.view(InfoBoxView, {
          text: I18n.t('pageflow_scrolled.editor.content_elements.heading.help_texts.shortcuts')
        });
      }

      this.view(SeparatorView);
      this.group('ContentElementPosition');
    });
  }
});

var img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e %3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e %3cpath fill='white' d='M 256%2c416 H 32 c -17.67%2c0 -32%2c14.33 -32%2c32 0%2c17.67 14.33%2c32 32%2c32 h 224 c 17.7%2c0 32%2c-14.33 32%2c-32 0%2c-17.67 -14.3%2c-32 -32%2c-32 z m 0%2c-256 H 32 c -17.67%2c0 -32%2c14.3 -32%2c32 0%2c17.7 14.33%2c32 32%2c32 h 224 c 17.7%2c0 32%2c-14.3 32%2c-32 0%2c-17.7 -14.3%2c-32 -32%2c-32 z M 0%2c320 c 0%2c17.7 14.33%2c32 32%2c32 h 384 c 17.7%2c0 32%2c-14.3 32%2c-32 0%2c-17.7 -14.3%2c-32 -32%2c-32 H 32 C 14.33%2c288 0%2c302.3 0%2c320 Z M 416%2c32 H 32 C 14.33%2c32 0%2c46.3 0%2c64 0%2c81.7 14.33%2c96 32%2c96 h 384 c 17.7%2c0 32%2c-14.3 32%2c-32 0%2c-17.7 -14.3%2c-32 -32%2c-32 z' /%3e%3c/svg%3e";

editor.contentElementTypes.register('textBlock', {
  pictogram: img$1,
  supportedPositions: ['inline'],
  configurationEditor: function configurationEditor(_ref) {
    var _this = this;

    var entry = _ref.entry,
        contentElement = _ref.contentElement;
    this.listenTo(contentElement.transientState, 'change:exampleNode', function () {
      return _this.refresh();
    });
    this.tab('general', function () {
      var exampleNode = ensureTextContent(contentElement.transientState.get('exampleNode'));
      var modelDelegator = entry.createLegacyTypographyVariantDelegator({
        model: contentElement.transientState,
        paletteColorPropertyName: 'color'
      });
      this.group('ContentElementTypographyVariant', {
        entry: entry,
        model: modelDelegator,
        prefix: exampleNode ? utils.camelize(exampleNode.type) : 'none',
        getPreviewConfiguration: function getPreviewConfiguration(configuration, variant) {
          return exampleNode ? _objectSpread2(_objectSpread2({}, configuration), {}, {
            value: [_objectSpread2(_objectSpread2({}, exampleNode), {}, {
              variant: variant
            }), // Ensure content spans whole preview viewport if
            // section uses "cards" appearance.
            {
              type: 'paragraph',
              children: [{
                text: ''
              }]
            }, {
              type: 'paragraph',
              children: [{
                text: ''
              }]
            }]
          }) : configuration;
        }
      });
      this.group('PaletteColor', {
        entry: entry,
        model: modelDelegator,
        propertyName: 'color'
      });
      this.view(SeparatorView);
      this.view(InfoBoxView, {
        text: I18n.t('pageflow_scrolled.editor.content_elements.textBlock.help_texts.shortcuts')
      });
    });
  },
  split: function split(configuration, insertIndex) {
    var value = getValue(configuration);
    return [_objectSpread2(_objectSpread2({}, configuration), {}, {
      value: value.slice(0, insertIndex)
    }), _objectSpread2(_objectSpread2({}, configuration), {}, {
      value: value.slice(insertIndex)
    })];
  },
  merge: function merge(configurationA, configurationB) {
    var value = getValue(configurationA).concat(getValue(configurationB));
    return _objectSpread2(_objectSpread2({}, configurationA), {}, {
      value: value
    });
  },
  getLength: function getLength(configuration) {
    return getValue(configuration).length;
  },
  handleDestroy: function handleDestroy(contentElement) {
    var transientState = contentElement.get('transientState') || {};

    if (!transientState.editableTextIsSingleBlock) {
      contentElement.postCommand({
        type: 'REMOVE'
      });
      return false;
    }
  }
});

function getValue(configuration) {
  // Value might still be empty if text block has not been edited
  return configuration.value || [{
    type: 'paragraph',
    children: [{
      text: ''
    }]
  }];
}

function ensureTextContent(node) {
  if (node && node.children.length === 1 && node.children[0].text === '') {
    return _objectSpread2(_objectSpread2({}, node), {}, {
      children: [{
        text: 'Lorem ipsum dolor sit amet'
      }]
    });
  } else {
    return node;
  }
}

var img$2 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('inlineImage', {
  pictogram: img$2,
  category: 'media',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor(_ref) {
    var contentElement = _ref.contentElement;
    this.tab('general', function () {
      this.input('id', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('portraitId', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false
      });
      this.input('enableFullscreen', CheckBoxInputView, {
        disabledBinding: ['position', 'width'],
        disabled: function disabled() {
          return contentElement.getWidth() === contentElementWidths.full;
        },
        displayUncheckedIfDisabled: true
      });
      this.group('ContentElementPosition');
    });
  }
});

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

var img$3 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('inlineVideo', {
  pictogram: img$3,
  category: 'media',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor() {
    migrateLegacyAutoplay(this.model);
    this.tab('general', function () {
      var _this = this;

      this.input('id', FileInputView, {
        collection: 'video_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        defaultTextTrackFilePropertyName: 'defaultTextTrackFileId',
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('posterId', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('portraitId', FileInputView, {
        collection: 'video_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        defaultTextTrackFilePropertyName: 'defaultTextTrackFileId',
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('portraitPosterId', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        visibleBinding: 'portraitId',
        visible: function visible() {
          return _this.model.getReference('portraitId', 'video_files');
        },
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.view(SeparatorView);
      this.input('playbackMode', SelectInputView, {
        values: ['manual', 'autoplay', 'loop']
      });
      this.input('hideControlBar', CheckBoxInputView, {
        disabledBinding: 'playbackMode',
        disabled: function disabled(playbackMode) {
          return playbackMode === 'loop';
        },
        displayCheckedIfDisabled: true
      });
      this.input('unmuteLabel', LabelOnlyView);
      this.input('unmute', CheckBoxInputView, {
        storeInverted: 'keepMuted'
      });
      this.input('rewindOnUnmute', CheckBoxInputView, {
        disabledBinding: ['playbackMode', 'keepMuted'],
        disabled: function disabled(_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              playbackMode = _ref2[0],
              keepMuted = _ref2[1];

          return playbackMode !== 'autoplay' || keepMuted;
        },
        displayUncheckedIfDisabled: true
      });
      this.view(SeparatorView);
      this.input('atmoDuringPlayback', SelectInputView, {
        values: ['play', 'mute', 'turnDown']
      });
      this.view(SeparatorView);
      this.group('ContentElementPosition');
    });
  }
});

function migrateLegacyAutoplay(model) {
  if (!model.has('playbackMode') && model.get('autoplay')) {
    model.set('playbackMode', 'autoplay', {
      trigger: false
    });
  }
}

var img$4 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('inlineAudio', {
  pictogram: img$4,
  category: 'media',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  defaultConfig: {
    playerControlVariant: 'waveformBars'
  },
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry;
    this.tab('general', function () {
      this.input('id', FileInputView, {
        collection: 'audio_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        defaultTextTrackFilePropertyName: 'defaultTextTrackFileId',
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('posterId', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.view(SeparatorView);
      this.input('autoplay', CheckBoxInputView);
      this.input('atmoDuringPlayback', SelectInputView, {
        values: ['play', 'mute', 'turnDown']
      });
      this.view(SeparatorView);
      this.input('playerControlVariant', SelectInputView, {
        values: ['waveformBars', 'waveformLines', 'waveform', 'classic'],
        ensureValueDefined: true
      });
      this.input('waveformColor', ColorInputView, {
        visibleBinding: 'playerControlVariant',
        visible: function visible(variant) {
          return variant === null || variant === void 0 ? void 0 : variant.startsWith('waveform');
        },
        defaultValue: entry.getTheme().get('options').colors.accent
      });
      this.view(SeparatorView);
      this.group('ContentElementPosition');
    });
  }
});

var img$5 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='utf-8'%3f%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg version='1.1' id='Youtube' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3e%3cpath fill='white' d='M10%2c2.3C0.172%2c2.3%2c0%2c3.174%2c0%2c10s0.172%2c7.7%2c10%2c7.7s10-0.874%2c10-7.7S19.828%2c2.3%2c10%2c2.3z M13.205%2c10.334 l-4.49%2c2.096C8.322%2c12.612%2c8%2c12.408%2c8%2c11.974V8.026C8%2c7.593%2c8.322%2c7.388%2c8.715%2c7.57l4.49%2c2.096 C13.598%2c9.85%2c13.598%2c10.15%2c13.205%2c10.334z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('videoEmbed', {
  pictogram: img$5,
  category: 'media',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor() {
    this.tab('general', function () {
      this.input('videoSource', UrlInputView, {
        supportedHosts: ['http://youtu.be', 'https://youtu.be', 'http://www.youtube.com', 'https://www.youtube.com', 'http://vimeo.com', 'https://vimeo.com', 'http://www.facebook.com', 'https://www.facebook.com'],
        displayPropertyName: 'displayVideoSource',
        required: true,
        permitHttps: true
      });
      this.input('posterId', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false
      });
      this.input('hideInfo', CheckBoxInputView$1);
      this.input('hideControls', CheckBoxInputView$1);
      this.input('aspectRatio', SelectInputView, {
        values: ['wide', 'narrow', 'square', 'portrait']
      });
      this.view(SeparatorView);
      this.input('atmoDuringPlayback', SelectInputView, {
        values: ['play', 'mute', 'turnDown']
      });
      this.view(SeparatorView);
      this.group('ContentElementPosition');
    });
  }
});

var img$6 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M412.6 181.9c-10.28-8.344-25.41-6.875-33.75 3.406c-8.406 10.25-6.906 25.37 3.375 33.78C393.5 228.4 400 241.8 400 256c0 14.19-6.5 27.62-17.81 36.87c-10.28 8.406-11.78 23.53-3.375 33.78c4.719 5.812 11.62 8.812 18.56 8.812c5.344 0 10.75-1.781 15.19-5.406C435.1 311.6 448 284.7 448 256S435.1 200.4 412.6 181.9zM301.2 34.84c-11.5-5.187-25.01-3.116-34.43 5.259L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9C272.7 477.2 280.3 480 288 480c4.438 0 8.959-.9313 13.16-2.837C312.7 472 320 460.6 320 448V64C320 51.41 312.7 39.1 301.2 34.84z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('soundDisclaimer', {
  pictogram: img$6,
  category: 'media',
  supportedPositions: ['inline'],
  configurationEditor: function configurationEditor() {
    this.tab('general', function () {
      this.view(NoOptionsHintView);
    });
  }
});

var DatawrapperAdView = Marionette.ItemView.extend({
  template: function template(data) {
    return "\n    <form action=\"https://datawrapper.de/chart/create\" method=\"POST\" target=\"_blank\">\n      <input type=\"hidden\" name=\"theme\" value=\"pageflow\" />\n      <input type=\"submit\" value=\"".concat(I18n.t('pageflow_scrolled.editor.content_elements.dataWrapperChart.attributes.create_chart.label'), "\" />\n    </form>\n  ");
  },
  className: 'datawrapper_ad'
});

var img$7 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M160 80C160 53.49 181.5 32 208 32H240C266.5 32 288 53.49 288 80V432C288 458.5 266.5 480 240 480H208C181.5 480 160 458.5 160 432V80zM0 272C0 245.5 21.49 224 48 224H80C106.5 224 128 245.5 128 272V432C128 458.5 106.5 480 80 480H48C21.49 480 0 458.5 0 432V272zM400 96C426.5 96 448 117.5 448 144V432C448 458.5 426.5 480 400 480H368C341.5 480 320 458.5 320 432V144C320 117.5 341.5 96 368 96H400z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('dataWrapperChart', {
  category: 'data',
  pictogram: img$7,
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor() {
    this.tab('general', function () {
      this.input('url', UrlInputView, {
        supportedHosts: ['cf.datawrapper.de', 'charts.datawrapper.de', 'datawrapper.dwcdn.de', 'datawrapper.dwcdn.net'],
        displayPropertyName: 'displayUrl',
        required: true,
        permitHttps: true
      });
      this.view(DatawrapperAdView);
      this.input('title', TextInputView, {
        placeholder: I18n.t('pageflow_scrolled.public.chart.default_title')
      });
      this.input('backgroundColor', ColorInputView, {
        defaultValue: '#323d4d'
      });
      this.group('ContentElementPosition');
    });
  }
});

var img$8 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e %3cpath fill='white' d='M 64%2c32 C 28.65%2c32 0%2c60.65 0%2c96 v 320 c 0%2c35.3 28.65%2c64 64%2c64 h 384 c 35.3%2c0 64%2c-28.7 64%2c-64 V 96 C 512%2c60.65 483.3%2c32 448%2c32 Z m 0%2c64 c 128%2c0 256%2c0 384%2c0 v 320 c -128%2c0 -256%2c0 -384%2c0 z m 182%2c28.52734 v 262.94532 h 22 V 124.52734 Z' /%3e %3cpath fill='white' d='m 186.81892%2c180.66143 c -12.25808%2c0.76551 -17.96668%2c13.50905 -26.61356%2c20.28687 -15.58075%2c16.39278 -33.16416%2c31.13354 -47.27512%2c48.79321 -4.0855%2c9.29219 2.78939%2c18.77866 10.09922%2c24.02983 19.1732%2c18.53891 37.00376%2c38.59231 57.19375%2c56.00728 11.59502%2c6.28738 27.33763%2c-7.35964 21.67579%2c-19.66992 -4.34142%2c-10.06283 -14.81383%2c-15.2758 -21.33624%2c-23.70538 -10.16266%2c-10.16266 -20.32532%2c-20.32532 -30.48798%2c-30.48798 16.9997%2c-17.81564 35.98195%2c-34.02522 51.5957%2c-53.07617 4.60995%2c-9.90721 -3.84461%2c-22.82682 -14.85156%2c-22.17774 z' /%3e %3cpath fill='white' d='m 325.18108%2c331.33857 c 12.25808%2c-0.76551 17.96668%2c-13.50905 26.61356%2c-20.28687 15.58075%2c-16.39278 33.16416%2c-31.13354 47.27512%2c-48.79321 4.0855%2c-9.29219 -2.78939%2c-18.77866 -10.09922%2c-24.02983 -19.1732%2c-18.53892 -37.00376%2c-38.59232 -57.19375%2c-56.00729 -11.59502%2c-6.28738 -27.33763%2c7.35964 -21.67579%2c19.66992 4.34142%2c10.06283 14.81383%2c15.2758 21.33624%2c23.70538 10.16266%2c10.16267 20.32532%2c20.32533 30.48798%2c30.48799 -16.9997%2c17.81564 -35.98195%2c34.02522 -51.5957%2c53.07617 -4.60995%2c9.90721 3.84461%2c22.82682 14.85156%2c22.17774 z' /%3e%3c/svg%3e";

editor.contentElementTypes.register('inlineBeforeAfter', {
  pictogram: img$8,
  category: 'interactive',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor() {
    this.tab('general', function () {
      this.input('before_id', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('before_label', TextInputView);
      this.input('after_id', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        positioning: false,
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('after_label', TextInputView);
      this.input('initial_slider_position', SliderInputView);
      this.input('slider_color', ColorInputView$1);
      this.group('ContentElementPosition');
    });
  },
  defaultConfig: {
    initial_slider_position: 50
  }
});

var SidebarRouter = Marionette.AppRouter.extend({
  appRoutes: {
    'scrolled/external_links/:id/:link_id': 'link'
  }
});

var SidebarEditLinkView = Marionette.Layout.extend({
  template: function template(data) {
    return "\n    <a class=\"back\">".concat(I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.back'), "</a>\n    <a class=\"destroy\">").concat(I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.destroy'), "</a>\n\n    <div class='form_container'></div>\n  ");
  },
  className: 'edit_external_link',
  regions: {
    formContainer: '.form_container'
  },
  events: {
    'click a.back': 'goBack',
    'click a.destroy': 'destroyLink'
  },
  initialize: function initialize(options) {},
  onRender: function onRender() {
    var configurationEditor = new ConfigurationEditorView({
      model: this.model,
      attributeTranslationKeyPrefixes: ['pageflow_scrolled.editor.content_elements.externalLinkList.attributes'],
      tabTranslationKeyPrefix: 'pageflow_scrolled.editor.content_elements.externalLinkList.tabs'
    });
    var self = this;
    configurationEditor.tab('edit_link', function () {
      this.input('url', TextInputView, {
        required: true
      });
      this.input('open_in_new_tab', CheckBoxInputView$1);
      this.input('thumbnail', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElement.externalLinks.link',
        fileSelectionHandlerOptions: {
          contentElementId: self.options.contentElement.get('id')
        },
        positioning: false
      });
      this.input('title', TextInputView, {
        required: true
      });
      this.input('description', TextInputView);
    });
    this.formContainer.show(configurationEditor);
  },
  goBack: function goBack() {
    editor$1.navigate("/scrolled/content_elements/".concat(this.options.contentElement.get('id')), {
      trigger: true
    });
  },
  destroyLink: function destroyLink() {
    if (window.confirm(I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.confirm_delete_link'))) {
      this.options.collection.remove(this.model);
      this.goBack();
    }
  }
});

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var ExternalLinkModel = Backbone.Model.extend({
  modelName: 'ExternalLink',
  i18nKey: 'external_link',
  mixins: [transientReferences],
  thumbnailUrl: function thumbnailUrl() {
    var image = this.collection.entry.imageFiles.getByPermaId(this.get('thumbnail'));
    return image ? image.get('thumbnail_url') : '';
  },
  title: function title() {
    return this.get('title');
  }
});

var ExternalLinkCollection = Backbone.Collection.extend({
  model: ExternalLinkModel,
  comparator: 'position',
  initialize: function initialize(models, options) {
    this.entry = options.entry;
    this.configuration = options.configuration;
    this.listenTo(this, 'add remove sort change', this.updateConfiguration);
  },
  modelId: function modelId(attrs) {
    return attrs.id;
  },
  updateConfiguration: function updateConfiguration() {
    this.configuration.set('links', this.toJSON());
  },
  addNewLink: function addNewLink() {
    var id = this.length ? Math.max.apply(Math, _toConsumableArray(this.pluck('id'))) + 1 : 1;
    this.add({
      id: id,
      title: '',
      url: '',
      thumbnail: '',
      description: '',
      open_in_new_tab: 1
    });
    return this.get(id);
  },
  saveOrder: function saveOrder() {}
});

ExternalLinkCollection.forContentElement = function (contentElement, entry) {
  return new ExternalLinkCollection(contentElement.configuration.get('links') || [], {
    entry: entry,
    configuration: contentElement.configuration
  });
};

var SidebarController = Marionette.Controller.extend({
  initialize: function initialize(options) {
    this.entry = options.entry;
    this.region = options.region;
  },
  link: function link(id, linkId) {
    var contentElement = this.entry.contentElements.get(id);
    var linksCollection = ExternalLinkCollection.forContentElement(contentElement, this.entry);
    this.region.show(new SidebarEditLinkView({
      model: linksCollection.get(linkId),
      collection: linksCollection,
      contentElement: contentElement
    }));
  }
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".SidebarListView-module_linksContainer__HvWq- {\n}\n";
var styles = {"linksContainer":"SidebarListView-module_linksContainer__HvWq-"};
styleInject(css);

var SidebarListView = Marionette.Layout.extend({
  template: function template(data) {
    return "\n    <label>Links</label>\n    <div class='".concat(styles.linksContainer, "'></div>\n    <button class=\"").concat(buttonStyles.addButton, "\">\n      ").concat(I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.add'), "\n    </button>\n  ");
  },
  regions: cssModulesUtils.ui(styles, 'linksContainer'),
  events: cssModulesUtils.events(buttonStyles, {
    'click addButton': 'addElement'
  }),
  onRender: function onRender() {
    this.linksContainer.show(new ListView({
      collection: this.collection,
      sortable: true,
      onEdit: _.bind(this.onEdit, this),
      onRemove: _.bind(this.onRemove, this)
    }));
  },
  addElement: function addElement() {
    var newModel = this.collection.addNewLink();
    this.onEdit(newModel);
  },
  onEdit: function onEdit(linkModel) {
    editor.navigate("/scrolled/external_links/".concat(this.options.contentElement.id, "/").concat(linkModel.id), {
      trigger: true
    });
  },
  onRemove: function onRemove(linkModel) {
    if (window.confirm(I18n.t('pageflow_scrolled.editor.content_elements.externalLinkList.confirm_delete_link'))) {
      this.collection.remove(linkModel);
    }
  }
});

var img$9 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M384 32H64C28.65 32 0 60.66 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.66 419.3 32 384 32zM344 312c0 17.69-14.31 32-32 32s-32-14.31-32-32V245.3l-121.4 121.4C152.4 372.9 144.2 376 136 376s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L234.8 200H168c-17.69 0-32-14.31-32-32s14.31-32 32-32h144c17.69 0 32 14.31 32 32V312z'/%3e%3c/svg%3e";

//router defines the URL hash path mapping and controller provides functions for the paths

editor.registerSideBarRouting({
  router: SidebarRouter,
  controller: SidebarController
}); // register external link list content element configuration editor for sidebar

editor.contentElementTypes.register('externalLinkList', {
  pictogram: img$9,
  category: 'links',
  supportedPositions: ['inline'],
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry;
    this.tab('general', function () {
      this.group('ContentElementVariant', {
        entry: entry
      });
      this.view(SidebarListView, {
        contentElement: this.model.parent,
        collection: ExternalLinkCollection.forContentElement(this.model.parent, entry)
      });
    });
  }
}); // register file handler for thumbnail of external link

editor.registerFileSelectionHandler('contentElement.externalLinks.link', function (options) {
  var contentElement = options.entry.contentElements.get(options.contentElementId);
  var links = ExternalLinkCollection.forContentElement(contentElement, options.entry);

  this.call = function (file) {
    var link = links.get(options.id);
    link.setReference('thumbnail', file);
  };

  this.getReferer = function () {
    return '/scrolled/external_links/' + contentElement.id + '/' + options.id;
  };
});

var img$a = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M578.2 66.06C409.8 116.6 230.2 116.6 61.8 66.06C31 56.82 0 79.88 0 112v319.9c0 32.15 30.1 55.21 61.79 45.97c168.4-50.53 347.1-50.53 516.4-.002C608.1 487.2 640 464.1 640 431.1V112C640 79.88 609 56.82 578.2 66.06zM128 224C110.3 224 96 209.7 96 192s14.33-32 32-32c17.68 0 32 14.33 32 32S145.7 224 128 224zM474.3 388.6C423.4 380.3 371.8 376 320 376c-50.45 0-100.7 4.043-150.3 11.93c-14.14 2.246-24.11-13.19-15.78-24.84l49.18-68.56C206.1 290.4 210.9 288 216 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C357.7 194.7 362.7 192 368 192s10.35 2.672 13.31 7.125l109.1 165.1C498.1 375.9 488.1 390.8 474.3 388.6z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('vrImage', {
  pictogram: img$a,
  category: 'interactive',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor() {
    this.tab('general', function () {
      this.input('image', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        filter: 'with_projection',
        positioning: false,
        dropDownMenuItems: [InlineFileRightsMenuItem]
      });
      this.input('initialYaw', SliderInputView$1, {
        unit: '°',
        minValue: -180,
        maxValue: 180
      });
      this.input('initialPitch', SliderInputView$1, {
        unit: '°',
        minValue: -60,
        maxValue: 60
      });
      this.group('ContentElementPosition');
    });
  }
});
editor.fileTypes.modify('image_files', {
  configurationEditorInputs: function configurationEditorInputs(model) {
    var values = ['equirectangular_mono', 'equirectangular_stereo'];
    return [{
      name: 'projection',
      inputView: SelectInputView$1,
      inputViewOptions: {
        includeBlank: true,
        values: values
      }
    }];
  },
  confirmUploadTableColumns: [{
    name: 'projection',
    cellView: EnumTableCellView
  }],
  filters: [{
    name: 'with_projection',
    matches: function matches(file) {
      return !!file.configuration.get('projection');
    }
  }]
});

var img$b = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 512'%3e%3c!--! Font Awesome Pro 6.1.1 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z'/%3e%3c/svg%3e";

var aspectRatios = ['wide', 'narrow', 'square', 'portrait'];
editor.contentElementTypes.register('iframeEmbed', {
  pictogram: img$b,
  category: 'interactive',
  featureName: 'iframe_embed_content_element',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry;
    this.tab('general', function () {
      this.input('source', TextInputView);
      this.input('requireConsent', CheckBoxInputView$1);
      this.view(InfoBoxView, {
        level: 'error',
        text: I18n.t('pageflow_scrolled.editor.content_elements.iframeEmbed.help_texts.missingConsentVendor'),
        visibleBinding: ['source', 'requireConsent'],
        visible: function visible(_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              source = _ref3[0],
              requireConsent = _ref3[1];

          return source && requireConsent && !entry.consentVendors.fromUrl(source);
        }
      });
      this.input('title', TextInputView);
      this.input('aspectRatio', SelectInputView, {
        values: aspectRatios
      });
      this.input('portraitAspectRatio', SelectInputView, {
        includeBlank: true,
        blankTranslationKey: 'pageflow_scrolled.editor.' + 'content_elements.iframeEmbed.' + 'attributes.portraitAspectRatio.blank',
        values: aspectRatios
      });
      this.input('scale', SelectInputView, {
        values: ['p100', 'p75', 'p50', 'p33']
      });
      this.group('ContentElementPosition');
    });
  }
});

var img$c = "data:image/svg+xml,%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e %3cpath fill='white' d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('twitterEmbed', {
  pictogram: img$c,
  category: 'media',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  configurationEditor: function configurationEditor() {
    this.tab('general', function () {
      this.input('url', UrlInputView, {
        supportedHosts: ['http://twitter.com', 'https://twitter.com', 'http://x.com', 'https://x.com'],
        displayPropertyName: 'displayTweetId',
        required: true,
        permitHttps: true
      });
      this.group('ContentElementPosition');
      this.input('hideConversation', CheckBoxInputView$1);
      this.input('hideMedia', CheckBoxInputView$1);
    });
  },
  defaultConfig: {
    caption: 'Add caption here'
  }
});

var img$d = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8' standalone='no'%3f%3e%3csvg xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' version='1.1'%3e %3cpath style='fill:white%3bstroke-width:1.0715934' d='M 154.45629%2c72.962988 C 141.76916%2c73.980674 134.17753%2c85.77696 126.39089%2c94.31369 115.08265%2c105.89861 104.03984%2c117.73757 92.93941%2c129.52047 75.031239%2c111.21828 59.122369%2c90.77981 39.104383%2c74.658023 24.482281%2c67.834512 6.4140221%2c83.81238 10.775786%2c99.1746 c 2.708951%2c12.98866 15.286417%2c19.97415 22.964661%2c29.74046 17.657732%2c17.41285 32.403074%2c38.12856 52.621136%2c52.73529 10.829773%2c3.83939 22.062597%2c-3.51996 28.134937%2c-12.18527 19.44195%2c-22.50249 42.21653%2c-42.18327 59.90279%2c-66.14032 5.6424%2c-13.25737 -5.31055%2c-30.615753 -19.94302%2c-30.361772 z' /%3e %3cpath style='fill:white' d='M 256%2c428 H 31.999999 C 14.329999%2c428 -9.5000001e-7%2c442.33 -9.5000001e-7%2c460 -9.5000001e-7%2c477.67 14.329999%2c492 31.999999%2c492 H 256 c 17.7%2c0 32%2c-14.33 32%2c-32 0%2c-17.67 -14.3%2c-32 -32%2c-32 z M -9.5000001e-7%2c332 C -9.5000001e-7%2c349.7 14.329999%2c364 31.999999%2c364 H 416 c 17.7%2c0 32%2c-14.3 32%2c-32 0%2c-17.7 -14.3%2c-32 -32%2c-32 H 31.999999 C 14.329999%2c300 -9.5000001e-7%2c314.3 -9.5000001e-7%2c332 Z' /%3e %3cpath style='fill:white%3bstroke:white%3bstroke-width:0' d='m 356.05605%2c1.671899 c -22.75276%2c2.300391 -47.49513%2c-4.661754 -68.50543%2c6.450454 -16.00534%2c8.484395 -29.74636%2c27.036262 -24.98608%2c45.803882 5.50667%2c15.699356 29.05588%2c21.427535 39.82967%2c7.900392 4.46727%2c-4.523763 5.45002%2c-13.464333 13.29935%2c-12.285569 15.47565%2c-0.207336 30.89377%2c0.32159 46.37678%2c-0.223975 7.3323%2c-0.346315 15.23462%2c5.874856 12.62272%2c13.740223 -2.68086%2c9.147994 -13.45058%2c10.823444 -20.24491%2c15.836144 -11.40111%2c6.6584 -24.83231%2c11.40873 -32.94777%2c22.30075 -5.41404%2c11.18313 -4.76974%2c25.17905 -0.0141%2c36.40876 8.15241%2c13.79679 31.57231%2c15.50575 40.17388%2c0.85347 4.19853%2c-4.46787 1.87713%2c-12.57946 8.75385%2c-14.22118 18.79687%2c-10.20424 40.72904%2c-20.78924 48.43263%2c-42.36648 C 431.32621%2c52.120851 413.71956%2c13.332394 382.01823%2c4.732093 373.62266%2c2.216616 364.78493%2c1.519639 356.05609%2c1.671899 Z M 341.22896%2c172.48634 c -21.90876%2c-0.63629 -38.00737%2c26.58485 -26.67177%2c45.4856 9.43025%2c18.07827 37.60246%2c22.17393 50.69123%2c5.8469 12.093%2c-13.5735 9.43272%2c-37.5803 -6.86539%2c-46.64791 -5.10378%2c-3.1728 -11.1363%2c-4.88155 -17.15407%2c-4.68459 z' /%3e%3c/svg%3e";

editor.contentElementTypes.register('question', {
  pictogram: img$d,
  supportedPositions: ['inline'],
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry,
        contentElement = _ref.contentElement;
    this.tab('general', function () {
      this.input('expandByDefault', CheckBoxInputView$1);
    });
  }
});

var img$e = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3e%3cpath fill='white' d='M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('counter', {
  category: 'data',
  pictogram: img$e,
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  defaultConfig: {
    targetValue: 100,
    countingSpeed: 'medium',
    textSize: 'medium'
  },
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry;
    var locale = entry.metadata.get('locale');
    this.tab('general', function () {
      this.input('targetValue', NumberInputView, {
        locale: locale
      });
      this.input('decimalPlaces', SelectInputView, {
        values: [0, 1, 2, 3],
        texts: [0, 1, 2, 3].map(function (i) {
          return 0 .toLocaleString(locale, {
            minimumFractionDigits: i
          });
        })
      });
      this.input('unit', TextInputView);
      this.input('unitPlacement', SelectInputView, {
        values: ['trailing', 'leading']
      });
      this.view(SeparatorView);
      this.input('entranceAnimation', SelectInputView, {
        values: ['none', 'fadeIn', 'fadeInFromBelow', 'fadeInFromAbove', 'fadeInScaleUp', 'fadeInScaleDown']
      });
      this.input('countingSpeed', SelectInputView, {
        values: ['none', 'slow', 'medium', 'fast']
      });
      this.input('startValue', NumberInputView, {
        locale: locale,
        visibleBinding: 'countingSpeed',
        visible: function visible(countingSpeed) {
          return countingSpeed !== 'none';
        }
      });
      this.view(SeparatorView);
      this.input('textSize', SelectInputView, {
        values: ['large', 'medium', 'small', 'verySmall']
      });
      this.group('ContentElementTypographyVariant', {
        entry: entry,
        getPreviewConfiguration: function getPreviewConfiguration(configuration, typographyVariant) {
          return _objectSpread2(_objectSpread2({}, configuration), {}, {
            typographyVariant: typographyVariant,
            entranceAnimation: 'none',
            countingSpeed: 'none',
            textSize: 'small',
            position: 'inline'
          });
        }
      });
      this.group('PaletteColor', {
        propertyName: 'numberColor',
        entry: entry
      });
      this.group('ContentElementPosition');
    });
  }
});

var img$f = "data:image/svg+xml,%3csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='quote-right' class='svg-inline--fa fa-quote-right fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='-50 -50 612 612'%3e%3cpath fill='white' d='M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z'%3e%3c/path%3e%3c/svg%3e";

editor.contentElementTypes.register('quote', {
  pictogram: img$f,
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xs', 'xl'],
  defaultConfig: {
    textSize: 'medium'
  },
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry;
    this.tab('general', function () {
      this.group('ContentElementVariant', {
        entry: entry
      });
      this.input('textSize', SelectInputView, {
        values: ['large', 'medium', 'small', 'verySmall']
      });
      this.group('ContentElementPosition');
      this.group('PaletteColor', {
        propertyName: 'color',
        entry: entry
      });
      this.view(SeparatorView);
      this.view(InfoBoxView, {
        text: I18n.t('pageflow_scrolled.editor.content_elements.textBlock.help_texts.shortcuts')
      });
    });
  }
});

var css$1 = ".ItemsListView-module_listContainer__2XDCy {\n}\n";
var styles$1 = {"listContainer":"ItemsListView-module_listContainer__2XDCy"};
styleInject(css$1);

var ItemsListView = Marionette.Layout.extend({
  template: function template(data) {
    return "\n    <div class='".concat(styles$1.listContainer, "'></div>\n    <button class=\"").concat(buttonStyles.addButton, "\">\n      ").concat(I18n.t('pageflow_scrolled.editor.content_elements.imageGallery.items.add'), "\n    </button>\n  ");
  },
  regions: cssModulesUtils.ui(styles$1, 'listContainer'),
  events: cssModulesUtils.events(buttonStyles, {
    'click addButton': function clickAddButton() {
      this.collection.selectImage();
    }
  }),
  onRender: function onRender() {
    var _this = this;

    this.listContainer.show(new ListView({
      label: I18n.t('pageflow_scrolled.editor.content_elements.imageGallery.items.label'),
      collection: this.collection,
      sortable: true,
      onRemove: function onRemove(model) {
        return _this.collection.remove(model);
      }
    }));
  }
});

var Item = Backbone.Model.extend({
  mixins: [transientReferences],
  thumbnailFile: function thumbnailFile() {
    var _this$imageFile;

    return (_this$imageFile = this.imageFile()) === null || _this$imageFile === void 0 ? void 0 : _this$imageFile.thumbnailFile();
  },
  title: function title() {
    var _this$imageFile2;

    return (_this$imageFile2 = this.imageFile()) === null || _this$imageFile2 === void 0 ? void 0 : _this$imageFile2.title();
  },
  imageFile: function imageFile() {
    return this.collection.entry.imageFiles.getByPermaId(this.get('image'));
  }
});

var ItemsCollection = Backbone.Collection.extend({
  model: Item,
  comparator: 'position',
  initialize: function initialize(models, options) {
    this.entry = options.entry;
    this.contentElement = options.contentElement;
    this.listenTo(this, 'add remove sort', this.updateConfiguration);
    this.listenTo(this, 'remove', this.pruneCaptions);
  },
  updateConfiguration: function updateConfiguration() {
    this.contentElement.configuration.set('items', this.toJSON());
  },
  pruneCaptions: function pruneCaptions() {
    this.contentElement.configuration.set('captions', _.pick.apply(_, [this.contentElement.configuration.get('captions') || {}].concat(_toConsumableArray(this.pluck('id')))));
  },
  selectImage: function selectImage() {
    editor$1.selectFile('image_files', 'newImageGalleryItem', {
      id: this.contentElement.id
    });
  },
  addWithId: function addWithId(imageFile) {
    this.add({
      id: this.length ? Math.max.apply(Math, _toConsumableArray(this.pluck('id'))) + 1 : 1,
      image: imageFile.get('perma_id')
    });
  },
  saveOrder: function saveOrder() {}
});

ItemsCollection.forContentElement = function (contentElement, entry) {
  return new ItemsCollection(contentElement.configuration.get('items') || [], {
    entry: entry,
    contentElement: contentElement
  });
};

var FileSelectionHandler = function FileSelectionHandler(options) {
  var contentElement = options.entry.contentElements.get(options.id);

  this.call = function (file) {
    ItemsCollection.forContentElement(contentElement).addWithId(file);
  };

  this.getReferer = function () {
    return '/scrolled/content_elements/' + contentElement.id;
  };
};

editor$1.registerFileSelectionHandler('newImageGalleryItem', FileSelectionHandler);

var img$g = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3e%3c!--! Font Awesome Pro 6.4.0 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons%2c Inc. --%3e%3cpath fill='white' d='M160 32c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320H328 280 200c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 0-88-39.4-88-88V120z'/%3e%3c/svg%3e";

editor.contentElementTypes.register('imageGallery', {
  pictogram: img$g,
  category: 'media',
  supportedPositions: ['inline', 'sticky', 'standAlone', 'left', 'right'],
  supportedWidthRange: ['xxs', 'full'],
  configurationEditor: function configurationEditor(_ref) {
    var entry = _ref.entry,
        contentElement = _ref.contentElement;
    this.tab('general', function () {
      this.view(ItemsListView, {
        collection: ItemsCollection.forContentElement(this.model.parent, entry)
      });
      this.input('enableFullscreenOnDesktop', CheckBoxInputView, {
        disabledBinding: ['position', 'width'],
        disabled: function disabled() {
          return contentElement.getWidth() === contentElementWidths.full;
        },
        displayUncheckedIfDisabled: true
      });
      this.group('ContentElementPosition');
    });
  }
});
