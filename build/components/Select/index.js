"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Select = props => {
  const {
    list,
    value,
    onChange
  } = props;
  return /*#__PURE__*/_react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, list.map((item, key) => /*#__PURE__*/_react.default.createElement(_ink.Box, {
    marginLeft: 3,
    key: key
  }, /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: "green"
  }, value === item.value ? '>' : ' '), /*#__PURE__*/_react.default.createElement(_ink.Spacer, null), typeof item.label === 'string' ? /*#__PURE__*/_react.default.createElement(_ink.Text, {
    color: "white"
  }, item.value) : item.label)));
};

exports.Select = Select;