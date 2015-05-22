'use strict';

/**
 * Module dependencies.
 * @private
 */

var convert = require('./lib/byte-convert');
var parse = require('./lib/byte-parse');

/**
 * Module exports.
 * @public
 */

module.exports = bytes;
module.exports.format = convert;
module.exports.parse = parse;

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
  if (typeof value === 'string') {
    return parse(value);
  }

  if (typeof value === 'number') {
    return convert(value, options);
  }

  return null;
}
