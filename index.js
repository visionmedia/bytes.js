'use strict';

var convertFunction = require('./lib/byte-convert.js');
var parseFunction = require('./lib/byte-parse.js');

/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @constructor
 */

function Bytes() {}

/**
 * Convert the given value in bytes into a string.
 *
 * If the value is negative, it is kept as such. If it is a float, it is rounded.
 *
 * @param {number} value Value to convert
 * @param {{
 *  case: ?string=,
 *  thousandsSeparator: ?string=
 * }} [options] See byte parser options.
 *
 * @return {string}
 */

Bytes.prototype.convert = convertFunction;

/**
 * Parse the string value into an integer in bytes. If no unit is given, it is assumed the value is in bytes.
 *
 * @param {number} value
 *
 * @returns {number|null}
 */

Bytes.prototype.parse = parseFunction;

/**
 *Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  thousandsSeparator: [string]
 *  }} [options] bytes options.
 *
 * @returns {string|number|null}
 */

function bytes(value, options) {
  var bytesObj = new Bytes();

  if (typeof value === 'string') {
    return bytesObj.parse(value);
  }

  if (typeof value === 'number') {
    return bytesObj.convert(value, options);
  }

  return null;
}

module.exports = bytes;
