/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */

'use strict';

/**
 * Module exports.
 * @public
 */

module.exports = bytes;
module.exports.format = format;
module.exports.parse = parse;

/**
 * Module variables.
 * @private
 */

var map = {
  b:  1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
  tb: ((1 << 30) * 1024)
};

/**
 *Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  thousandsSeparator: [string]
 *  precision: [number]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */

function bytes(value, options) {
  if (typeof value === 'string') {
    return parse(value);
  }

  if (typeof value === 'number') {
    return format(value, options);
  }

  return null;
}

/**
 * Format the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float,
 * it is rounded.
 *
 * @param {number} value
 * @param {object} [options]
 * @param {string} [options.thousandsSeparator=]
 * @param {number} [options.precision=2]
 * @public
 */

function format(val, options) {
  if (typeof val !== 'number') {
    return null;
  }

  var mag = Math.abs(val);
  var thousandsSeparator = (options && options.thousandsSeparator) || '';
  var precision = (options && (typeof options.precision === 'number')) ? options.precision : 2;
  var unit = 'B';
  var value = val;
  var roundingValue = Math.pow(10, precision);

  if (mag >= map.tb) {
    value = Math.round(value / map.tb * roundingValue) / roundingValue;
    unit = 'TB';
  } else if (mag >= map.gb) {
    value = Math.round(value / map.gb * roundingValue) / roundingValue;
    unit = 'GB';
  } else if (mag >= map.mb) {
    value = Math.round(value / map.mb * roundingValue) / roundingValue;
    unit = 'MB';
  } else if (mag >= map.kb) {
    value = Math.round(value / map.kb * roundingValue) / roundingValue;
    unit = 'kB';
  }

  if (thousandsSeparator) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }

  return value + unit;
}

/**
 * Parse the string value into an integer in bytes.
 *
 * If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number|string} val
 * @public
 */

function parse(val) {
  if (typeof val === 'number' && !isNaN(val)) {
    return val;
  }

  if (typeof val !== 'string') {
    return null;
  }

  // Test if the string passed is valid
  var results = val.match(/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i);
  var floatValue;
  var unit = 'b';

  if (!results) {
    // Nothing could be extracted from the given string
    floatValue = parseInt(val);
    unit = 'b'
  } else {
    // Retrieve the value and the unit
    floatValue = parseFloat(results[1]);
    unit = results[4].toLowerCase();
  }

  return map[unit] * floatValue;
}
