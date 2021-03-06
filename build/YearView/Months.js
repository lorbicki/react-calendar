'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Flex = require('../Flex');

var _Flex2 = _interopRequireDefault(_Flex);

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _dates = require('../shared/dates');

var _utils = require('../shared/utils');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Months = function (_PureComponent) {
  _inherits(Months, _PureComponent);

  function Months() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Months);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Months.__proto__ || Object.getPrototypeOf(Months)).call.apply(_ref, [this].concat(args))), _this), _this.start = 0, _this.end = 11, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Months, [{
    key: 'render',
    value: function render() {
      var end = this.end,
          start = this.start,
          year = this.year;
      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          onClick = _props.onClick,
          tileClassName = _props.tileClassName,
          tileContent = _props.tileContent,
          value = _props.value,
          valueType = _props.valueType;


      var monthProps = {
        maxDate: maxDate,
        minDate: minDate,
        onClick: onClick,
        tileClassName: tileClassName,
        tileContent: tileContent
      };

      var months = [];
      for (var monthIndex = start; monthIndex <= end; monthIndex += 1) {
        var date = new Date(year, monthIndex, 1);

        months.push(_react2.default.createElement(_Month2.default, _extends({}, (0, _utils.getTileActivityFlags)(value, valueType, date, 'month'), {
          date: date,
          key: monthIndex
        }, monthProps)));
      }

      return _react2.default.createElement(
        _Flex2.default,
        {
          className: 'react-calendar__year-view__months',
          count: 3,
          wrap: true
        },
        months
      );
    }
  }, {
    key: 'year',
    get: function get() {
      var activeStartDate = this.props.activeStartDate;

      return (0, _dates.getYear)(activeStartDate);
    }
  }]);

  return Months;
}(_react.PureComponent);

exports.default = Months;


Months.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date).isRequired,
  maxDate: _propTypes3.isMaxDate,
  minDate: _propTypes3.isMinDate,
  onClick: _propTypes2.default.func,
  tileClassName: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes3.isClassName]),
  tileContent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  value: _propTypes3.isValue,
  valueType: _propTypes2.default.string
};