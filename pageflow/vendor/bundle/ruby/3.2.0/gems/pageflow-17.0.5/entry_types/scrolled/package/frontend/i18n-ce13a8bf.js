import React, { useReducer, useMemo, useCallback, createContext as createContext$1, useContext } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { createSelectorCreator, defaultMemoize, createSelector } from 'reselect';
import slugify from 'slugify';
import I18n from 'i18n-js';

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

var PREFIX = 'PAGEFLOW_SCROLLED_COLLECTION';
var RESET = "".concat(PREFIX, "_RESET");
var ADD = "".concat(PREFIX, "_ADD");
var CHANGE = "".concat(PREFIX, "_CHANGE");
var PATCH_CONFIGURATION = "".concat(PREFIX, "_PATCH_CONFIGURATION");
var REMOVE = "".concat(PREFIX, "_REMOVE");
var SORT = "".concat(PREFIX, "_SORT");
function useCollections() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      keyAttribute = _ref.keyAttribute;

  return useReducer(reducer, Object.keys(seed).reduce(function (result, key) {
    result[key] = init(seed[key], keyAttribute);
    return result;
  }, {}));
}

function reducer(state, action) {
  var collectionName = action.payload.collectionName;
  var keyAttribute = action.payload.keyAttribute;

  switch (action.type) {
    case RESET:
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, collectionName, init(action.payload.items, keyAttribute)));

    case ADD:
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, collectionName, {
        order: action.payload.order,
        items: _objectSpread2(_objectSpread2({}, state[collectionName].items), {}, _defineProperty({}, action.payload.attributes[keyAttribute], action.payload.attributes))
      }));

    case CHANGE:
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, collectionName, {
        order: state[collectionName].order,
        items: _objectSpread2(_objectSpread2({}, state[collectionName].items), {}, _defineProperty({}, action.payload.attributes[keyAttribute], action.payload.attributes))
      }));

    case PATCH_CONFIGURATION:
      var key = action.payload.key;
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, collectionName, {
        order: state[collectionName].order,
        items: _objectSpread2(_objectSpread2({}, state[collectionName].items), {}, _defineProperty({}, key, _objectSpread2(_objectSpread2({}, state[collectionName].items[key]), {}, {
          configuration: _objectSpread2(_objectSpread2({}, state[collectionName].items[key].configuration), action.payload.configuration)
        })))
      }));

    case REMOVE:
      var clonedItems = _objectSpread2({}, state[collectionName].items);

      delete clonedItems[action.payload.key];
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, collectionName, {
        order: action.payload.order,
        items: clonedItems
      }));

    case SORT:
      return _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, collectionName, {
        order: action.payload.order,
        items: state[collectionName].items
      }));

    default:
      return state;
  }
}

function init(items) {
  var keyAttribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  items = items.filter(function (item) {
    return item[keyAttribute];
  });
  return {
    order: items.map(function (item) {
      return item[keyAttribute];
    }),
    items: items.reduce(function (result, item) {
      result[item[keyAttribute]] = item;
      return result;
    }, {})
  };
}

function updateConfiguration(_ref2) {
  var dispatch = _ref2.dispatch,
      name = _ref2.name,
      key = _ref2.key,
      configuration = _ref2.configuration;
  dispatch({
    type: PATCH_CONFIGURATION,
    payload: {
      collectionName: name,
      key: key,
      configuration: configuration
    }
  });
}
function getItem(state, collectionName, key) {
  if (state[collectionName]) {
    return state[collectionName].items[key];
  }
}
function createMultipleItemsSelector(collectionNames, filter) {
  return createSelector.apply(void 0, _toConsumableArray(collectionNames.map(function (collectionName) {
    return function (collections) {
      return collections[collectionName];
    };
  })).concat([function () {
    for (var _len = arguments.length, collections = new Array(_len), _key = 0; _key < _len; _key++) {
      collections[_key] = arguments[_key];
    }

    return collectionNames.reduce(function (result, collectionName, index) {
      result[collectionName] = toOrderedItems(collections[index]);
      return result;
    }, {});
  }]));
}
function createItemsSelector(collectionName, filter) {
  if (filter) {
    var itemsSelector = createItemsSelector(collectionName);
    return createShallowEqualArraysSelector(function (collections) {
      return itemsSelector(collections).filter(filter);
    }, function (items) {
      return items;
    });
  }

  return createSelector(function (collections) {
    return collections[collectionName];
  }, toOrderedItems);
}

function toOrderedItems(collection) {
  if (collection) {
    var items = collection.items;
    return collection.order.map(function (key) {
      return items[key];
    });
  } else {
    return [];
  }
}

var createShallowEqualArraysSelector = createSelectorCreator(defaultMemoize, shallowEqualArrays);

function shallowEqualArrays(a, b) {
  return a.length === b.length && a.every(function (item, index) {
    return item === b[index];
  });
}

var Context = createContext();
function EntryStateProvider(_ref) {
  var seed = _ref.seed,
      children = _ref.children;

  var _useCollections = useCollections(seed.collections, {
    keyAttribute: 'permaId'
  }),
      _useCollections2 = _slicedToArray(_useCollections, 2),
      collections = _useCollections2[0],
      dispatch = _useCollections2[1];

  var value = useMemo(function () {
    return {
      entryState: {
        collections: collections,
        config: seed.config
      },
      dispatch: dispatch
    };
  }, [collections, dispatch, seed]);
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: value
  }, children);
}

function useEntryState() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (entryState) {
    return entryState;
  };
  return useContextSelector(Context, function (value) {
    return selector(value.entryState);
  });
}

function useEntryStateDispatch() {
  return useContextSelector(Context, function (value) {
    return value.dispatch;
  });
}
function useEntryStateConfig() {
  return useEntryState(function (entryState) {
    return entryState.config;
  });
}
function useEntryStateCollectionItem(collectionName, key) {
  return useEntryState(function (entryState) {
    return getItem(entryState.collections, collectionName, key);
  });
}
function useEntryStateCollectionItems(collectionName, filter) {
  var itemsSelector = useMemo(function () {
    return createItemsSelector(collectionName, filter);
  }, [collectionName, filter]);
  return useEntryState(function (entryState) {
    return itemsSelector(entryState.collections);
  });
}
function useMultipleEntryStateCollectionItems(collectionNames) {
  var multipleItemsSelector = useMemo(function () {
    return createMultipleItemsSelector(collectionNames);
  }, [collectionNames]);
  return useEntryState(function (entryState) {
    return multipleItemsSelector(entryState.collections);
  });
}

/**
 * Returns data generated by a Ruby lambda registered server
 * side via `config.additional_frontend_seed_data.register`.
 *
 * @example
 *
 * const data = useAdditionalSeedData('someSeed');
 */

function useAdditionalSeedData(name) {
  var config = useEntryStateConfig();

  if (!config.additionalSeedData[name]) {
    throw new Error("Could not find additional seed data with name '".concat(name, "'."));
  }

  return config.additionalSeedData[name];
}

function useContentElementConsentVendor(_ref) {
  var contentElementId = _ref.contentElementId;
  var config = useEntryStateConfig();
  var vendorName = config.contentElementConsentVendors[contentElementId];
  return config.consentVendors.find(function (vendor) {
    return vendor.name === vendorName;
  });
}

/**
 * Returns a nested data structure representing the metadata of the entry.
 *
 * @example
 *
 * const metaData = useEntryMetadata();
 * metaData // =>
 *   {
 *     id: 5,
 *     locale: 'en',
 *     shareProviders: {email: false, facebook: true},
 *     share_url: 'http://test.host/test',
 *     credits: 'Credits: Pageflow'
 *   }
 */

function useEntryMetadata() {
  var entries = useEntryStateCollectionItems('entries');
  return useMemo(function () {
    return entries[0];
  }, [entries]);
}

/**
 * Returns a list of attributes (iconName, name and url) of all configured share
 * providers of the entry. The url provides a %{url} placeholder where the link
 * can be inserted. iconName can be passed to ThemeIcon to render a theme
 * specific icon.
 *
 * @example
 *
 * const shareProviders = useShareProviders(options);
 * shareProviders // =>
 *   [
 *     {
 *       iconName: 'facebook',
 *       name: 'Facebook',
 *       url: http://www.facebook.com/sharer/sharer.php?u=%{url}
 *     },
 *     {
 *       iconName: 'twitter',
 *       name: 'Twitter',
 *       url: https://x.com/intent/post?url=%{url}
 *     }
 *   ]
 */

function useShareProviders(_ref) {
  var isPhonePlatform = _ref.isPhonePlatform;
  var config = useEntryStateConfig();
  var entryMetadata = useEntryMetadata();
  var shareProviders = (entryMetadata === null || entryMetadata === void 0 ? void 0 : entryMetadata.shareProviders) || {};
  var urlTemplates = config.shareUrlTemplates;
  return useMemo(function () {
    var sharing = {
      email: {
        iconName: 'email',
        name: 'Mail',
        url: urlTemplates.email
      },
      facebook: {
        iconName: 'facebook',
        name: 'Facebook',
        url: urlTemplates.facebook
      },
      linked_in: {
        iconName: 'linkedIn',
        name: 'LinkedIn',
        url: urlTemplates.linked_in
      },
      telegram: {
        iconName: 'telegram',
        name: 'Telegram',
        url: urlTemplates.telegram
      },
      twitter: {
        iconName: 'twitter',
        name: 'X',
        url: urlTemplates.twitter
      },
      whats_app: {
        iconName: 'whatsApp',
        name: 'WhatsApp',
        url: urlTemplates.whats_app
      }
    };
    return activeShareProviders(shareProviders, isPhonePlatform).map(function (provider) {
      var config = sharing[provider];
      return {
        name: config.name,
        iconName: config.iconName,
        url: config.url
      };
    });
  }, [shareProviders, isPhonePlatform, urlTemplates]);
}

function activeShareProviders(shareProvidersConfig, isPhonePlatform) {
  var providers = filterShareProviders(shareProvidersConfig, isPhonePlatform);
  return providers.filter(function (provider) {
    return shareProvidersConfig[provider] !== false;
  });
}

function filterShareProviders(shareProvidersConfig, isPhonePlatform) {
  if (!isPhonePlatform) {
    return Object.keys(shareProvidersConfig).filter(function (provider) {
      return provider !== 'telegram' && provider !== 'whats_app';
    });
  }

  return Object.keys(shareProvidersConfig);
}
/**
 * Returns the share url of the entry.
 *
 * @example
 *
 * const shareUrl = useShareUrl();
 * shareUrl // => "http://test.host/test"
 */


function useShareUrl() {
  var entryMetadata = useEntryMetadata();
  var config = useEntryStateConfig();

  if (entryMetadata) {
    return entryMetadata.shareUrl ? entryMetadata.shareUrl : config.prettyUrl;
  } else {
    return config.shareUrl;
  }
}

/**
 * Returns a nested data structure representing the chapters and sections
 * of the entry.
 *
 * @private
 *
 * @example
 *
 * const structure = useEntryStructure();
 * structure // =>
 *   [
 *     {
 *       permaId: 5,
 *       title: 'Chapter 1',
 *       summary: 'An introductory chapter',
 *       sections: [
 *         {
 *           id: 1,
 *           permaId: 101,
 *           chapterId: 3,
 *           sectionIndex: 0,
 *           transition: 'scroll',
 *
 *           // references to parent chapter
 *           chapter: { ... },
 *
 *           // references to adjacent section objects
 *           previousSection: { ... },
 *           nextSection: { ... },
 *         }
 *       ],
 *     }
 *   ]
 */

function useEntryStructure() {
  var chapters = useChapters();
  var sections = useEntryStateCollectionItems('sections');
  return useMemo(function () {
    var linkedSections = sections.map(function (section) {
      return sectionData(section);
    });
    linkedSections.forEach(function (section, index) {
      section.sectionIndex = index;
      section.previousSection = linkedSections[index - 1];
      section.nextSection = linkedSections[index + 1];
    });
    return chapters.map(function (chapter) {
      var chapterSections = linkedSections.filter(function (item) {
        return item.chapterId === chapter.id;
      });
      chapterSections.forEach(function (section) {
        return section.chapter = chapter;
      });
      return _objectSpread2(_objectSpread2({}, chapter), {}, {
        sections: chapterSections
      });
    });
  }, [chapters, sections]);
}
/**
 * Returns an array of sections each with a chapter property containing
 * data about the parent chapter.
 *
 * @private
 *
 * @example
 *
 * const sections = useSectionsWithChapter();
 * sections // =>
 *   [
 *     {
 *       id: 1,
 *       permaId: 101,
 *       chapterId: 3,
 *       transition: 'scroll',
 *       chapter: {
 *         id: 3,
 *         permaId: 5,
 *         title: 'Chapter 1',
 *         summary: 'An introductory chapter',
 *         chapterSlug: 'chapter-1'
 *       },
 *     }
 *   ]
 */

function useSectionsWithChapter() {
  var chapters = useChapters();
  var sections = useEntryStateCollectionItems('sections');
  var chaptersById = useMemo(function () {
    return chapters.reduce(function (result, chapter) {
      result[chapter.id] = chapter;
      return result;
    }, {});
  }, [chapters]);
  return useMemo(function () {
    return sections.map(function (section, sectionIndex) {
      return _objectSpread2(_objectSpread2({
        sectionIndex: sectionIndex
      }, sectionData(section)), {}, {
        chapter: chaptersById[section.chapterId]
      });
    });
  }, [chaptersById, sections]);
}
/**
 * Returns a nested data structure representing the content elements
 * of section.
 *
 * @param {Object} options
 * @param {number} options.sectionPermaId
 *
 * @private
 *
 * @example
 *
 * const section = useSection({sectionPermaId: 4});
 * section // =>
 *   {
 *     id: 100,
 *     permaId: 4,
 *     chapterId: 1,
 *     transition: 'scroll'
 *   }
 */

function useSection(_ref) {
  var sectionPermaId = _ref.sectionPermaId;
  var section = useEntryStateCollectionItem('sections', sectionPermaId);
  return sectionData(section);
}

function sectionData(section) {
  return section && _objectSpread2({
    permaId: section.permaId,
    id: section.id,
    chapterId: section.chapterId
  }, section.configuration);
}

function useSectionContentElements(_ref2) {
  var sectionId = _ref2.sectionId,
      layout = _ref2.layout;
  var filterBySectionId = useCallback(function (contentElement) {
    return contentElement.sectionId === sectionId;
  }, [sectionId]);
  var contentElements = useEntryStateCollectionItems('contentElements', filterBySectionId);
  return contentElements.map(function (contentElement) {
    var position = getPosition(contentElement, layout);
    return {
      id: contentElement.id,
      permaId: contentElement.permaId,
      type: contentElement.typeName,
      position: position,
      width: getWidth(contentElement, position),
      standAlone: contentElement.configuration.position === 'standAlone',
      props: contentElement.configuration
    };
  });
}
var supportedPositions = {
  center: ['inline', 'left', 'right'],
  centerRagged: ['inline', 'left', 'right'],
  left: ['inline', 'sticky'],
  right: ['inline', 'sticky']
};

function getPosition(contentElement, layout) {
  var position = contentElement.configuration.position;
  return supportedPositions[layout || 'left'].includes(position) ? position : 'inline';
}

var legacyPositionWidths = {
  wide: 2,
  full: 3
};
var clampedWidthPositions = ['sticky', 'left', 'right'];

function getWidth(contentElement, position) {
  var width = typeof contentElement.configuration.width === 'number' ? contentElement.configuration.width : legacyPositionWidths[contentElement.configuration.position] || 0;

  if (clampedWidthPositions.includes(position)) {
    return Math.min(Math.max(width || 0, -2), 2);
  } else {
    return width;
  }
}

function useChapter(_ref3) {
  var permaId = _ref3.permaId;
  var chapters = useChapters();
  return useMemo(function () {
    return chapters.find(function (chapter) {
      return chapter.permaId === permaId;
    });
  }, [chapters, permaId]);
}
function useChapters() {
  var chapters = useEntryStateCollectionItems('chapters');
  return useMemo(function () {
    var chapterSlugs = {};
    return chapters.map(function (chapter, index) {
      var chapterSlug = chapter.configuration.title;

      if (chapterSlug) {
        chapterSlug = slugify(chapterSlug, {
          lower: true,
          locale: 'de',
          strict: true
        });

        if (chapterSlugs[chapterSlug]) {
          chapterSlug = chapterSlug + '-' + chapter.permaId; //append permaId if chapter reference is not unique
        }

        chapterSlugs[chapterSlug] = chapter;
      } else {
        chapterSlug = 'chapter-' + chapter.permaId;
      }

      return {
        id: chapter.id,
        permaId: chapter.permaId,
        index: index,
        title: chapter.configuration.title,
        summary: chapter.configuration.summary,
        chapterSlug: chapterSlug
      };
    });
  }, [chapters]);
}

function extendFile(collectionName, file, config) {
  return addModelType(collectionName, expandUrls(collectionName, file, config.fileUrlTemplates), config.fileModelTypes);
}

function addModelType(collectionName, file, modelTypes) {
  if (!file) {
    return null;
  }

  if (!modelTypes[collectionName]) {
    throw new Error("Could not find model type for collection name ".concat(collectionName));
  }

  return _objectSpread2(_objectSpread2({}, file), {}, {
    modelType: modelTypes[collectionName]
  });
}

function expandUrls(collectionName, file, urlTemplates) {
  if (!file) {
    return null;
  }

  if (!urlTemplates[collectionName]) {
    throw new Error("No file url templates found for ".concat(collectionName));
  }

  var variants = file.variants ? ['original'].concat(_toConsumableArray(file.variants)) : Object.keys(urlTemplates[collectionName]);
  var urls = variants.reduce(function (result, variant) {
    var url = getFileUrl(collectionName, file, variant, urlTemplates);

    if (url) {
      result[variant] = url;
    }

    return result;
  }, {});
  return _objectSpread2({
    urls: urls
  }, file);
}

function getFileUrl(collectionName, file, quality, urlTemplates) {
  var templates = urlTemplates[collectionName];
  var template = templates[quality];

  if (template) {
    return template.replace(':id_partition', idPartition(file.id)).replace(':basename', file.basename).replace(':extension', file.extension).replace(':processed_extension', file.processedExtension).replace(':pageflow_hls_qualities', function () {
      return hlsQualities(file);
    });
  }
}

function idPartition(id) {
  return partition(pad(id, 9));
}

function partition(string, separator) {
  return string.replace(/./g, function (c, i, a) {
    return i && (a.length - i) % 3 === 0 ? '/' + c : c;
  });
}

function pad(string, size) {
  return (Array(size).fill(0).join('') + string).slice(-size);
}

function hlsQualities(file) {
  return ['low', 'medium', 'high', 'fullhd', '4k'].filter(function (quality) {
    return file.variants.includes(quality);
  }).join(',');
}

/**
 * Look up a file by its collection and perma id.
 *
 * @param {Object} options
 * @param {String} options.collectionName - Collection name of file type to look for (in camel case).
 * @param {String} options.permaId - Perma id of file look up
 *
 * @example
 * const imageFile = useFile({collectionName: 'imageFiles', permaId: 5});
 * imageFile // =>
 *   {
 *     id: 102,
 *     permaId: 5,
 *     width: 1000,
 *     height: 500,
 *     urls: {
 *       large: 'https://...'
 *     },
 *     configuration: {
 *       alt: '...'
 *     }
 *   }
 */

function useFile(_ref) {
  var collectionName = _ref.collectionName,
      permaId = _ref.permaId;
  var file = useEntryStateCollectionItem(collectionName, permaId);
  return extendFile(collectionName, file, useEntryStateConfig());
}

function useFileWithInlineRights(_ref) {
  var configuration = _ref.configuration,
      collectionName = _ref.collectionName,
      propertyName = _ref.propertyName;
  var file = useFile({
    collectionName: collectionName,
    permaId: configuration[propertyName]
  });
  var config = useEntryStateConfig();
  return file && _objectSpread2(_objectSpread2({}, file), {}, {
    license: file.configuration.license && config.fileLicenses[file.configuration.license],
    inlineRights: file.configuration.rights_display === 'inline' && !configuration[propertyName === 'id' ? 'inlineRightsHidden' : "".concat(propertyName.replace('Id', ''), "InlineRightsHidden")]
  });
}

function useNestedFiles(_ref) {
  var collectionName = _ref.collectionName,
      parent = _ref.parent;
  var config = useEntryStateConfig();
  var files = useEntryStateCollectionItems(collectionName, function (file) {
    return parent && file.parentFileId === parent.id && file.parentFileModelType === parent.modelType;
  });
  return files.map(function (file) {
    return extendFile(collectionName, file, config);
  });
}

function getFileUrlTemplateHost(seed, collectionName, variant) {
  var hlsUrlTemplate = seed.config.fileUrlTemplates[collectionName][variant];
  return hlsUrlTemplate.split('//')[1].split('/')[0];
}

/**
 * Returns a collection of rights and source urls of all files
 * used in the entry. If none of the files has a rights attribute
 * configured, it falls back to the default file rights of the
 * entry's site, otherwise returns an empty array.
 *
 * @example
 *
 * const fileRights = useFileRights();
 * fileRights // => [{text: 'author of image 1', urls: ['https://example.com/source-url']}]
 */

function useFileRights() {
  var _config$defaultFileRi;

  var config = useEntryStateConfig();
  var fileCollectionNames = Object.keys(config.fileModelTypes);
  var files = useMultipleEntryStateCollectionItems(fileCollectionNames);
  var defaultFileRights = (_config$defaultFileRi = config.defaultFileRights) === null || _config$defaultFileRi === void 0 ? void 0 : _config$defaultFileRi.trim();
  var items = {};
  Object.keys(files).forEach(function (key) {
    return files[key].filter(function (file) {
      return file.configuration.rights_display !== 'inline';
    }).forEach(function (file) {
      var _file$rights;

      var text = ((_file$rights = file.rights) === null || _file$rights === void 0 ? void 0 : _file$rights.trim()) || defaultFileRights;

      if (text) {
        var _file$configuration$s;

        items[text] = items[text] || {
          text: text,
          urls: new Set()
        };

        if ((_file$configuration$s = file.configuration.source_url) === null || _file$configuration$s === void 0 ? void 0 : _file$configuration$s.trim()) {
          items[text].urls.add(file.configuration.source_url);
        }
      }
    });
  });
  return Object.values(items).map(function (item) {
    return _objectSpread2(_objectSpread2({}, item), {}, {
      urls: Array.from(item.urls).sort()
    });
  }).sort(function (a, b) {
    return a.text.localeCompare(b.text);
  });
}
/**
 * Returns a nested data structure representing the legal info of the entry.
 * Each legal info is separated into label and url to use in links.
 * Both label and url can be blank, depending on the configuration.
 *
 * @example
 *
 * const legalInfo = useLegalInfo();
 * legalInfo // =>
 *   {
 *     imprint: {
 *       label: '',
 *       url: ''
 *     },
 *     copyright: {
 *       label: '',
 *       url: ''
 *     },
 *     privacy: {
 *       label: '',
 *       url: ''
 *     }
 *   }
 */

function useLegalInfo() {
  var config = useEntryStateConfig();
  return config.legalInfo;
}
/**
 * Returns the credits string (rich text) of the entry.
 *
 * @example
 *
 * const credits = useCredits();
 * credits // => "Credits: <a href="http://pageflow.com">pageflow.com</a>"
 */

function useCredits() {
  var entryMetadata = useEntryMetadata();
  var credits = '';

  if (entryMetadata) {
    credits = entryMetadata.credits;
  }

  return credits;
}

var qualities = ['medium', 'fullhd', '4k'];
function useAvailableQualities(file) {
  if (!file) {
    return [];
  }

  return ['auto'].concat(_toConsumableArray(qualities.filter(function (name) {
    return file.variants.includes(name);
  })));
}

/**
 * Returns an object containing theme asset paths.
 *
 * @example
 *
 * const theme = useTheme();
 * theme // =>
 *   {
 *     assets: {
 *       logoDesktop: 'path/to/logoDesktop.svg',
 *       logoMobile: 'path/to/logoMobile.svg'
 *     },
 *     options: {
 *       // options passed to `themes.register` in `pageflow.rb` initializer
 *       // with camleized keys.
 *     }
 *   }
 */

function useTheme() {
  var config = useEntryStateConfig();
  return config.theme;
}

function useWidget(_ref) {
  var role = _ref.role;
  var widgets = useEntryStateCollectionItems('widgets');
  return useMemo(function () {
    return widgets.find(function (widget) {
      return widget.role === role && widget.typeName;
    });
  }, [role, widgets]);
}

function updateContentElementConfiguration(_ref) {
  var dispatch = _ref.dispatch,
      permaId = _ref.permaId,
      configuration = _ref.configuration;
  updateConfiguration({
    dispatch: dispatch,
    name: 'contentElements',
    key: permaId,
    configuration: configuration
  });
}

var LocaleContext = createContext$1('en');
function setupI18n(_ref) {
  var defaultLocale = _ref.defaultLocale,
      locale = _ref.locale,
      translations = _ref.translations;
  I18n.defaultLocale = defaultLocale;
  I18n.locale = locale;
  I18n.translations = translations;
}
function LocaleProvider(_ref2) {
  var children = _ref2.children;

  var _ref3 = useEntryMetadata() || {},
      locale = _ref3.locale;

  return /*#__PURE__*/React.createElement(LocaleContext.Provider, {
    value: locale
  }, children);
}
function useLocale() {
  return useContext(LocaleContext);
}
/**
 * Use translations in frontend elements. Uses the configured locale
 * of the current entry by default. Note that only translation keys
 * from the `pageflow_scrolled.public` scope are universally
 * available.
 *
 * to render translations for inline editing controls in the editor
 * preview, you can pass `"ui"` as `locale` option and use
 * translations from the `pageflow_scrolled.inline_editing` scope.
 *
 * @param {Object} [options]
 * @param {string} [locale="entry"] -
 *   Pass `"ui"` to use the locale of the editor interface instead.
 *
 * @example
 * const {t} = useI18n();
 * t('pageflow_scrolled.public.some.key')
 *
 * const {t} = useI18n({locale: 'ui'});
 * t('pageflow_scrolled.inline_editing.some.key')
 */

function useI18n() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      scope = _ref4.locale;

  var locale = useLocale();
  return {
    t: function t(key, options) {
      return I18n.t(key, _objectSpread2(_objectSpread2({}, options), {}, {
        locale: scope !== 'ui' && locale
      }));
    }
  };
}

export { useShareProviders as A, useShareUrl as B, useLocale as C, updateContentElementConfiguration as D, EntryStateProvider as E, _unsupportedIterableToArray as F, LocaleProvider as L, _slicedToArray as _, _objectSpread2 as a, _defineProperty as b, useEntryMetadata as c, useNestedFiles as d, _objectWithoutProperties as e, useWidget as f, useTheme as g, useFileWithInlineRights as h, useFile as i, useSectionContentElements as j, useAdditionalSeedData as k, useSectionsWithChapter as l, useContentElementConsentVendor as m, _toConsumableArray as n, useChapter as o, useEntryStateDispatch as p, useSection as q, useEntryStructure as r, getFileUrlTemplateHost as s, useAvailableQualities as t, useI18n as u, setupI18n as v, useChapters as w, useCredits as x, useFileRights as y, useLegalInfo as z };
