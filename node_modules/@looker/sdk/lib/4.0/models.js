"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekStartDay = exports.UserAttributeFilterTypes = exports.SupportedVisualizationFormattings = exports.SupportedFormattings = exports.SupportedFormats = exports.SupportedDownloadSettings = exports.SupportedActionTypes = exports.SslVersion = exports.SecretType = exports.ResultFormat = exports.PullRequestMode = exports.PermissionType = exports.Name = exports.InvestigativeContentType = exports.Format = exports.FillStyle = exports.DeviceType = exports.DestinationType = exports.DependencyStatus = exports.ComparisonType = exports.Category = exports.Align = void 0;
var Align = function (Align) {
  Align["left"] = "left";
  Align["right"] = "right";
  return Align;
}({});
exports.Align = Align;
var Category = function (Category) {
  Category["parameter"] = "parameter";
  Category["filter"] = "filter";
  Category["measure"] = "measure";
  Category["dimension"] = "dimension";
  return Category;
}({});
exports.Category = Category;
var ComparisonType = function (ComparisonType) {
  ComparisonType["EQUAL_TO"] = "EQUAL_TO";
  ComparisonType["GREATER_THAN"] = "GREATER_THAN";
  ComparisonType["GREATER_THAN_OR_EQUAL_TO"] = "GREATER_THAN_OR_EQUAL_TO";
  ComparisonType["LESS_THAN"] = "LESS_THAN";
  ComparisonType["LESS_THAN_OR_EQUAL_TO"] = "LESS_THAN_OR_EQUAL_TO";
  ComparisonType["INCREASES_BY"] = "INCREASES_BY";
  ComparisonType["DECREASES_BY"] = "DECREASES_BY";
  ComparisonType["CHANGES_BY"] = "CHANGES_BY";
  return ComparisonType;
}({});
exports.ComparisonType = ComparisonType;
var DependencyStatus = function (DependencyStatus) {
  DependencyStatus["lock_optional"] = "lock_optional";
  DependencyStatus["lock_required"] = "lock_required";
  DependencyStatus["lock_error"] = "lock_error";
  DependencyStatus["install_none"] = "install_none";
  return DependencyStatus;
}({});
exports.DependencyStatus = DependencyStatus;
var DestinationType = function (DestinationType) {
  DestinationType["EMAIL"] = "EMAIL";
  DestinationType["ACTION_HUB"] = "ACTION_HUB";
  return DestinationType;
}({});
exports.DestinationType = DestinationType;
var DeviceType = function (DeviceType) {
  DeviceType["android"] = "android";
  DeviceType["ios"] = "ios";
  return DeviceType;
}({});
exports.DeviceType = DeviceType;
var FillStyle = function (FillStyle) {
  FillStyle["enumeration"] = "enumeration";
  FillStyle["range"] = "range";
  return FillStyle;
}({});
exports.FillStyle = FillStyle;
var Format = function (Format) {
  Format["topojson"] = "topojson";
  Format["vector_tile_region"] = "vector_tile_region";
  return Format;
}({});
exports.Format = Format;
var InvestigativeContentType = function (InvestigativeContentType) {
  InvestigativeContentType["dashboard"] = "dashboard";
  return InvestigativeContentType;
}({});
exports.InvestigativeContentType = InvestigativeContentType;
var Name = function (Name) {
  Name["day"] = "day";
  Name["hour"] = "hour";
  Name["minute"] = "minute";
  Name["second"] = "second";
  Name["millisecond"] = "millisecond";
  Name["microsecond"] = "microsecond";
  Name["week"] = "week";
  Name["month"] = "month";
  Name["quarter"] = "quarter";
  Name["year"] = "year";
  return Name;
}({});
exports.Name = Name;
var PermissionType = function (PermissionType) {
  PermissionType["view"] = "view";
  PermissionType["edit"] = "edit";
  return PermissionType;
}({});
exports.PermissionType = PermissionType;
var PullRequestMode = function (PullRequestMode) {
  PullRequestMode["off"] = "off";
  PullRequestMode["links"] = "links";
  PullRequestMode["recommended"] = "recommended";
  PullRequestMode["required"] = "required";
  return PullRequestMode;
}({});
exports.PullRequestMode = PullRequestMode;
var ResultFormat = function (ResultFormat) {
  ResultFormat["inline_json"] = "inline_json";
  ResultFormat["json"] = "json";
  ResultFormat["json_detail"] = "json_detail";
  ResultFormat["json_fe"] = "json_fe";
  ResultFormat["json_bi"] = "json_bi";
  ResultFormat["csv"] = "csv";
  ResultFormat["html"] = "html";
  ResultFormat["md"] = "md";
  ResultFormat["txt"] = "txt";
  ResultFormat["xlsx"] = "xlsx";
  ResultFormat["gsxml"] = "gsxml";
  ResultFormat["sql"] = "sql";
  return ResultFormat;
}({});
exports.ResultFormat = ResultFormat;
var SecretType = function (SecretType) {
  SecretType["SSO"] = "SSO";
  SecretType["JWT"] = "JWT";
  return SecretType;
}({});
exports.SecretType = SecretType;
var SslVersion = function (SslVersion) {
  SslVersion["TLSv1_1"] = "TLSv1_1";
  SslVersion["SSLv23"] = "SSLv23";
  SslVersion["TLSv1_2"] = "TLSv1_2";
  return SslVersion;
}({});
exports.SslVersion = SslVersion;
var SupportedActionTypes = function (SupportedActionTypes) {
  SupportedActionTypes["cell"] = "cell";
  SupportedActionTypes["query"] = "query";
  SupportedActionTypes["dashboard"] = "dashboard";
  SupportedActionTypes["none"] = "none";
  return SupportedActionTypes;
}({});
exports.SupportedActionTypes = SupportedActionTypes;
var SupportedDownloadSettings = function (SupportedDownloadSettings) {
  SupportedDownloadSettings["push"] = "push";
  SupportedDownloadSettings["url"] = "url";
  return SupportedDownloadSettings;
}({});
exports.SupportedDownloadSettings = SupportedDownloadSettings;
var SupportedFormats = function (SupportedFormats) {
  SupportedFormats["txt"] = "txt";
  SupportedFormats["csv"] = "csv";
  SupportedFormats["inline_json"] = "inline_json";
  SupportedFormats["json"] = "json";
  SupportedFormats["json_label"] = "json_label";
  SupportedFormats["json_detail"] = "json_detail";
  SupportedFormats["json_detail_lite_stream"] = "json_detail_lite_stream";
  SupportedFormats["xlsx"] = "xlsx";
  SupportedFormats["html"] = "html";
  SupportedFormats["wysiwyg_pdf"] = "wysiwyg_pdf";
  SupportedFormats["assembled_pdf"] = "assembled_pdf";
  SupportedFormats["wysiwyg_png"] = "wysiwyg_png";
  SupportedFormats["csv_zip"] = "csv_zip";
  return SupportedFormats;
}({});
exports.SupportedFormats = SupportedFormats;
var SupportedFormattings = function (SupportedFormattings) {
  SupportedFormattings["formatted"] = "formatted";
  SupportedFormattings["unformatted"] = "unformatted";
  return SupportedFormattings;
}({});
exports.SupportedFormattings = SupportedFormattings;
var SupportedVisualizationFormattings = function (SupportedVisualizationFormattings) {
  SupportedVisualizationFormattings["apply"] = "apply";
  SupportedVisualizationFormattings["noapply"] = "noapply";
  return SupportedVisualizationFormattings;
}({});
exports.SupportedVisualizationFormattings = SupportedVisualizationFormattings;
var UserAttributeFilterTypes = function (UserAttributeFilterTypes) {
  UserAttributeFilterTypes["advanced_filter_string"] = "advanced_filter_string";
  UserAttributeFilterTypes["advanced_filter_number"] = "advanced_filter_number";
  UserAttributeFilterTypes["advanced_filter_datetime"] = "advanced_filter_datetime";
  UserAttributeFilterTypes["string"] = "string";
  UserAttributeFilterTypes["number"] = "number";
  UserAttributeFilterTypes["datetime"] = "datetime";
  UserAttributeFilterTypes["relative_url"] = "relative_url";
  UserAttributeFilterTypes["yesno"] = "yesno";
  UserAttributeFilterTypes["zipcode"] = "zipcode";
  return UserAttributeFilterTypes;
}({});
exports.UserAttributeFilterTypes = UserAttributeFilterTypes;
var WeekStartDay = function (WeekStartDay) {
  WeekStartDay["monday"] = "monday";
  WeekStartDay["tuesday"] = "tuesday";
  WeekStartDay["wednesday"] = "wednesday";
  WeekStartDay["thursday"] = "thursday";
  WeekStartDay["friday"] = "friday";
  WeekStartDay["saturday"] = "saturday";
  WeekStartDay["sunday"] = "sunday";
  return WeekStartDay;
}({});
exports.WeekStartDay = WeekStartDay;
//# sourceMappingURL=models.js.map