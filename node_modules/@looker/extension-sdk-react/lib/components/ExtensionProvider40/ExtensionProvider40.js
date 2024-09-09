"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensionContext40 = void 0;
exports.ExtensionProvider40 = ExtensionProvider40;
var _react = _interopRequireWildcard(require("react"));
var _extensionSdk = require("@looker/extension-sdk");
var _ExtensionConnector = require("../ExtensionConnector");
var _core_sdk_ = require("../../sdk/core_sdk_40");
var _excluded = ["children"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ExtensionContext40 = _react.default.createContext(undefined);
exports.ExtensionContext40 = ExtensionContext40;
function ExtensionProvider40(props) {
  var {
      children
    } = props,
    rest = _objectWithoutProperties(props, _excluded);
  var [extensionData, setExtensionData] = (0, _react.useState)({});
  var connectedCallback = extensionHost => {
    var coreSDK = _extensionSdk.LookerExtensionSDK.create40Client(extensionHost);
    (0, _core_sdk_.registerCore40SDK)(coreSDK);
    var {
      visualizationSDK,
      tileSDK,
      lookerHostData
    } = extensionHost;
    var {
      visualizationData
    } = visualizationSDK;
    var {
      tileHostData
    } = tileSDK;
    setExtensionData(previousState => {
      return _objectSpread(_objectSpread({}, previousState), {}, {
        extensionSDK: extensionHost,
        coreSDK,
        visualizationSDK,
        tileSDK,
        visualizationData,
        tileHostData,
        lookerHostData
      });
    });
  };
  var unloadedCallback = () => {
    (0, _core_sdk_.unregisterCore40SDK)();
  };
  var updateContextData = updatedContextData => {
    setExtensionData(previousState => {
      return _objectSpread(_objectSpread({}, previousState), updatedContextData);
    });
  };
  return _react.default.createElement(ExtensionContext40.Provider, {
    value: extensionData
  }, _react.default.createElement(_ExtensionConnector.ExtensionConnector, _extends({}, rest, {
    contextData: extensionData,
    connectedCallback: connectedCallback,
    updateContextData: updateContextData,
    unloadedCallback: unloadedCallback
  }), children));
}
//# sourceMappingURL=ExtensionProvider40.js.map