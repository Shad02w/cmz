"use strict";

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _Select = require("./components/Select");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App = () => {
  const items = [{
    label: /*#__PURE__*/_react.default.createElement(_ink.Text, {
      color: "white"
    }, "Refactor"),
    value: 'refactor'
  }, {
    label: /*#__PURE__*/_react.default.createElement(_ink.Text, {
      color: "white"
    }, "Fix"),
    value: 'fix'
  }];
  return /*#__PURE__*/_react.default.createElement(_Select.Select, {
    list: items,
    value: "refactor",
    onChange: () => {}
  });
};

(0, _ink.render)( /*#__PURE__*/_react.default.createElement(App, null));