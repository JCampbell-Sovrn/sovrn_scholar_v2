function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR } from '../../util/errors';
import { ExtensionRequestType } from '../types';
import { DashboardRunState } from './types';
var defaultHostData = {
  isDashboardEditing: false,
  dashboardRunState: DashboardRunState.UNKNOWN,
  dashboardFilters: {}
};
export class TileSDKImpl {
  constructor(hostApi) {
    _defineProperty(this, "hostApi", void 0);
    _defineProperty(this, "tileHostData", void 0);
    this.hostApi = hostApi;
    this.tileHostData = _objectSpread({}, defaultHostData);
  }
  tileHostDataChanged(partialHostData) {
    if (this.hostApi.isDashboardMountSupported) {
      this.tileHostData = _objectSpread(_objectSpread({}, this.tileHostData), partialHostData);
    }
  }
  addErrors() {
    if (this.hostApi.isDashboardMountSupported) {
      for (var _len = arguments.length, errors = new Array(_len), _key = 0; _key < _len; _key++) {
        errors[_key] = arguments[_key];
      }
      this.hostApi.send(ExtensionRequestType.TILE_ADD_ERRORS, {
        errors
      });
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  clearErrors(group) {
    if (this.hostApi.isDashboardMountSupported) {
      this.hostApi.send(ExtensionRequestType.TILE_CLEAR_ERRORS, {
        group
      });
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  openDrillMenu(options, event) {
    if (this.hostApi.isDashboardMountSupported) {
      this.hostApi.send(ExtensionRequestType.TILE_OPEN_DRILL_MENU, {
        options,
        event: this.sanitizeEvent(event)
      });
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  toggleCrossFilter(options, event) {
    if (this.hostApi.isDashboardMountSupported) {
      this.hostApi.send(ExtensionRequestType.TILE_TOGGLE_CROSS_FILTER, {
        options,
        event: this.sanitizeEvent(event)
      });
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  runDashboard() {
    if (this.hostApi.isDashboardMountSupported) {
      this.hostApi.send(ExtensionRequestType.TILE_RUN_DASHBOARD, {});
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  stopDashboard() {
    if (this.hostApi.isDashboardMountSupported) {
      this.hostApi.send(ExtensionRequestType.TILE_STOP_DASHBOARD, {});
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  updateFilters(filters) {
    var run = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (this.hostApi.isDashboardMountSupported) {
      this.hostApi.send(ExtensionRequestType.TILE_UPDATE_FILTERS, {
        filters,
        run
      });
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  openScheduleDialog() {
    if (this.hostApi.isDashboardMountSupported) {
      return this.hostApi.sendAndReceive(ExtensionRequestType.TILE_OPEN_SCHEDULE_DIALOG, {});
    } else {
      throw NOT_DASHBOARD_MOUNT_NOT_SUPPORTED_ERROR;
    }
  }
  sanitizeEvent(event) {
    if (event) {
      return {
        metaKey: event.metaKey,
        pageX: event.pageX,
        pageY: event.pageY,
        type: event.type
      };
    }
    return undefined;
  }
}
//# sourceMappingURL=tile_sdk.js.map