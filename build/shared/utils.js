'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTileActivityFlags = exports.between = exports.doRangesOverlap = exports.isRangeWithinRange = exports.isValueWithinRange = exports.callIfDefined = exports.mergeFunctions = undefined;

var _dates = require('./dates');

/**
 * Returns a function that, when called, calls all the functions
 * passed to it, applying its arguments to them.
 *
 * @param {Function[]} functions
 */
var mergeFunctions = exports.mergeFunctions = function mergeFunctions() {
  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return functions.filter(function (f) {
      return f;
    }).forEach(function (f) {
      return f.apply(undefined, args);
    });
  };
};

/**
 * Calls a function, if it's defined, with specified arguments
 * @param {Function} fn
 * @param {Object} args
 */
var callIfDefined = exports.callIfDefined = function callIfDefined(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  if (fn && typeof fn === 'function') {
    fn.apply(undefined, args);
  }
};

var isValueWithinRange = exports.isValueWithinRange = function isValueWithinRange(value, range) {
  return range[0] <= value && range[1] >= value;
};

var isRangeWithinRange = exports.isRangeWithinRange = function isRangeWithinRange(greaterRange, smallerRange) {
  return greaterRange[0] <= smallerRange[0] && greaterRange[1] >= smallerRange[1];
};

var doRangesOverlap = exports.doRangesOverlap = function doRangesOverlap(range1, range2) {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
};

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {*} value Value to return.
 * @param {*} min Minimum return value.
 * @param {*} max Maximum return value.
 */
var between = exports.between = function between(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
};

var getTileActivityFlags = exports.getTileActivityFlags = function getTileActivityFlags(value, valueType, date, dateType) {
  var flags = {};
  if (!value) {
    flags.active = false;
    flags.hasActive = false;
    return flags;
  }

  if (!date || !(value instanceof Array) && !valueType || !(date instanceof Array) && !dateType) {
    throw new Error('getTileActivityFlags(): Unable to get tile activity flags because one or more required arguments were not passed.');
  }

  var valueRange = value instanceof Array ? value : (0, _dates.getRange)(valueType, value);
  var dateRange = date instanceof Array ? date : (0, _dates.getRange)(dateType, date);

  flags.active = isRangeWithinRange(valueRange, dateRange);
  flags.hasActive = flags.active ? false : doRangesOverlap(valueRange, dateRange);

  return flags;
};