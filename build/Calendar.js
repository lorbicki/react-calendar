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

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _Navigation = require('./Calendar/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _CenturyView = require('./CenturyView');

var _CenturyView2 = _interopRequireDefault(_CenturyView);

var _DecadeView = require('./DecadeView');

var _DecadeView2 = _interopRequireDefault(_DecadeView);

var _YearView = require('./YearView');

var _YearView2 = _interopRequireDefault(_YearView);

var _MonthView = require('./MonthView');

var _MonthView2 = _interopRequireDefault(_MonthView);

var _dates = require('./shared/dates');

var _locales = require('./shared/locales');

var _propTypes3 = require('./shared/propTypes');

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var datesAreDifferent = function datesAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1.getTime() !== date2.getTime();
};

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeStartDate: _this.getActiveStartDate(),
      view: _this.getView()
    }, _this.setActiveStartDate = function (activeStartDate) {
      _this.setState({ activeStartDate: activeStartDate });
      _this.props.onActiveDateChange({
        activeStartDate,
        view: _this.state.view
      });
    }, _this.drillDown = function (activeStartDate) {
      if (!_this.drillDownAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        var nextView = views[views.indexOf(prevState.view) + 1];
        return {
          activeStartDate: activeStartDate,
          view: nextView
        };
      }, function () {
        (0, _utils.callIfDefined)(_this.props.onDrillDown, {
          activeStartDate: activeStartDate,
          view: _this.state.view
        });
      });
    }, _this.drillUp = function () {
      if (!_this.drillUpAvailable) {
        return;
      }

      var views = _this.getLimitedViews();

      _this.setState(function (prevState) {
        var nextView = views[views.indexOf(prevState.view) - 1];
        var activeStartDate = (0, _dates.getBegin)(nextView, prevState.activeStartDate);

        return {
          activeStartDate: activeStartDate,
          view: nextView
        };
      }, function () {
        (0, _utils.callIfDefined)(_this.props.onDrillUp, {
          activeStartDate: _this.state.activeStartDate,
          view: _this.state.view
        });
      });
    }, _this.onChange = function (value) {
      (0, _utils.callIfDefined)(_this.props.onChange, _this.getProcessedValue(value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'getValueArray',
    value: function getValueArray(value) {
      if (value instanceof Array) {
        return value;
      }

      return [this.getValueFrom(value), this.getValueTo(value)];
    }
  }, {
    key: 'getValueFrom',
    value: function getValueFrom(value) {
      if (!value) {
        return null;
      }

      var _props = this.props,
          maxDate = _props.maxDate,
          minDate = _props.minDate;

      var rawValueFrom = value instanceof Array ? value[0] : value;
      var valueFromDate = new Date(rawValueFrom);

      if (Number.isNaN(valueFromDate.getTime())) {
        throw new Error('Invalid date: ' + value);
      }

      var valueFrom = (0, _dates.getBegin)(this.valueType, valueFromDate);

      return (0, _utils.between)(valueFrom, minDate, maxDate);
    }
  }, {
    key: 'getValueTo',
    value: function getValueTo(value) {
      if (!value) {
        return null;
      }

      var _props2 = this.props,
          maxDate = _props2.maxDate,
          minDate = _props2.minDate;

      var rawValueTo = value instanceof Array ? value[1] : value;
      var valueToDate = new Date(rawValueTo);

      if (Number.isNaN(valueToDate.getTime())) {
        throw new Error('Invalid date: ' + value);
      }

      var valueTo = (0, _dates.getEnd)(this.valueType, valueToDate);

      return (0, _utils.between)(valueTo, minDate, maxDate);
    }

    /**
     * Returns views array with disallowed values cut off.
     */

  }, {
    key: 'getLimitedViews',
    value: function getLimitedViews() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var minDetail = props.minDetail,
          maxDetail = props.maxDetail;


      return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
    }

    /**
     * Determines whether a given view is allowed with currently applied settings.
     */

  }, {
    key: 'isViewAllowed',
    value: function isViewAllowed() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.view;

      var views = this.getLimitedViews(props);

      return views.indexOf(view) !== -1;
    }

    /**
     * Gets current value in a desired format.
     */

  }, {
    key: 'getProcessedValue',
    value: function getProcessedValue(value) {
      var returnValue = this.props.returnValue;


      switch (returnValue) {
        case 'start':
          return this.getValueFrom(value);
        case 'end':
          return this.getValueTo(value);
        case 'range':
          return this.getValueArray(value);
        default:
          throw new Error('Invalid returnValue.');
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _locales.setLocale)(this.props.locale);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextLocale = nextProps.locale,
          nextValue = nextProps.value;
      var _props3 = this.props,
          locale = _props3.locale,
          value = _props3.value;


      if (nextLocale !== locale) {
        (0, _locales.setLocale)(nextLocale);
      }

      var nextState = {};

      var allowedViewChanged = nextProps.minDetail !== this.props.minDetail || nextProps.maxDetail !== this.props.maxDetail;

      if (allowedViewChanged && !this.isViewAllowed(nextProps)) {
        nextState.view = this.getView(nextProps);
      }

      var nextValueFrom = this.getValueFrom(nextValue);
      var valueFrom = this.getValueFrom(value);

      var nextValueTo = this.getValueTo(nextValue);
      var valueTo = this.getValueTo(value);

      if (allowedViewChanged || datesAreDifferent(nextValueFrom, valueFrom) || datesAreDifferent(nextValueTo, valueTo)) {
        nextState.activeStartDate = this.getActiveStartDate(nextProps);
      }

      this.setState(nextState);
    }
  }, {
    key: 'getActiveStartDate',
    value: function getActiveStartDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var rangeType = this.getView(props);
      var valueFrom = this.getValueFrom(props.value) || props.activeStartDate || new Date();
      return (0, _dates.getBegin)(rangeType, valueFrom);
    }
  }, {
    key: 'getView',
    value: function getView() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var view = props.view;


      if (view && this.getLimitedViews(props).indexOf(view) !== -1) {
        return view;
      }

      return this.getLimitedViews(props).pop();
    }

    /**
     * Called when the user uses navigation buttons.
     */

  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _props4 = this.props,
          calendarType = _props4.calendarType,
          maxDate = _props4.maxDate,
          minDate = _props4.minDate,
          renderChildren = _props4.renderChildren,
          tileClassName = _props4.tileClassName,
          tileContent = _props4.tileContent,
          value = _props4.value;
      var _state = this.state,
          activeStartDate = _state.activeStartDate,
          view = _state.view;


      var commonProps = {
        activeStartDate: activeStartDate,
        maxDate: maxDate,
        minDate: minDate,
        tileClassName: tileClassName,
        tileContent: tileContent || renderChildren, // For backwards compatibility
        value: this.getProcessedValue(value),
        valueType: this.valueType
      };

      var clickAction = this.drillDownAvailable ? this.drillDown : this.onChange;

      switch (view) {
        case 'century':
          return _react2.default.createElement(_CenturyView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDecade)
          }, commonProps));
        case 'decade':
          return _react2.default.createElement(_DecadeView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickYear)
          }, commonProps));
        case 'year':
          return _react2.default.createElement(_YearView2.default, _extends({
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickMonth)
          }, commonProps));
        case 'month':
          return _react2.default.createElement(_MonthView2.default, _extends({
            calendarType: calendarType,
            onClick: (0, _utils.mergeFunctions)(clickAction, this.props.onClickDay),
            onClickWeekNumber: this.props.onClickWeekNumber,
            showNeighboringMonth: this.props.showNeighboringMonth,
            showWeekNumbers: this.props.showWeekNumbers
          }, commonProps));
        default:
          throw new Error('Invalid view: ' + view + '.');
      }
    }
  }, {
    key: 'renderNavigation',
    value: function renderNavigation() {
      var showNavigation = this.props.showNavigation;


      if (!showNavigation) {
        return null;
      }

      return _react2.default.createElement(_Navigation2.default, {
        activeRange: this.state.activeRange,
        activeStartDate: this.state.activeStartDate,
        drillUp: this.drillUp,
        maxDate: this.props.maxDate,
        minDate: this.props.minDate,
        next2Label: this.props.next2Label,
        nextLabel: this.props.nextLabel,
        prev2Label: this.props.prev2Label,
        prevLabel: this.props.prevLabel,
        setActiveStartDate: this.setActiveStartDate,
        view: this.state.view,
        views: this.getLimitedViews()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: (0, _mergeClassNames2.default)('react-calendar', this.props.className) },
        this.renderNavigation(),
        this.renderContent()
      );
    }
  }, {
    key: 'drillDownAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;


      return views.indexOf(view) < views.length - 1;
    }
  }, {
    key: 'drillUpAvailable',
    get: function get() {
      var views = this.getLimitedViews();
      var view = this.state.view;


      return views.indexOf(view) > 0;
    }

    /**
     * Returns value type that can be returned with currently applied settings.
     */

  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;

      return allValueTypes[allViews.indexOf(maxDetail)];
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;


Calendar.defaultProps = {
  maxDetail: 'month',
  minDetail: 'century',
  returnValue: 'start',
  showNavigation: true,
  showNeighboringMonth: true,
  view: 'month'
};

Calendar.propTypes = {
  activeStartDate: _propTypes2.default.instanceOf(Date),
  calendarType: _propTypes3.isCalendarType,
  className: _propTypes3.isClassName,
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  minDetail: _propTypes2.default.oneOf(allViews),
  next2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  onActiveDateChange: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onClickDay: _propTypes2.default.func,
  onClickDecade: _propTypes2.default.func,
  onClickMonth: _propTypes2.default.func,
  onClickWeekNumber: _propTypes2.default.func,
  onClickYear: _propTypes2.default.func,
  onDrillDown: _propTypes2.default.func,
  onDrillUp: _propTypes2.default.func,
  prev2Label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  prevLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  renderChildren: _propTypes2.default.func, // For backwards compatibility
  returnValue: _propTypes2.default.oneOf(['start', 'end', 'range']),
  showNavigation: _propTypes2.default.bool,
  showNeighboringMonth: _propTypes2.default.bool,
  showWeekNumbers: _propTypes2.default.bool,
  tileClassName: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes3.isClassName]),
  tileContent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes3.isValue]),
  view: _propTypes2.default.oneOf(allViews)
};
