'use strict';

var convertFunction = require(__dirname + '/lib/byte-convert.js'),
    parseFunction = require(__dirname + '/lib/byte-parse.js');

/**
 * Convert the given value in bytes into a string or parse to string to an integer in bytes.
 *
 * @param {string|number} value
 * @param {{
 *  case: [string],
 *  thousandSeparator: [string]
 *  }} [options] Parser options.
 *
 * @returns {string|number|null}
 * @api public
 */
function parser(value, options) {

  if (this) {
    // Case where parser is called as a constructor
    /**
     * Convert the given value in bytes into a string.
     *
     * If the value is negative, it is kept as such. If it is a float, it is rounded.
     *
     * @param {number} value Value to convert
     * @param {{
     *  case: ?string=,
     *  thousandSeparator: ?string=
     * }} [options] See byte parser options.
     *
     * @return {string}
     * @api public
     */
    this.convert = convertFunction;

    /**
     * Parse the string value into an integer in bytes. If no unit is given, it is assumed the value is in bytes.
     *
     * @param {number} value
     *
     * @returns {number|null}
     * @api public
     */
    this.parse = parseFunction;
  }

  if (typeof value === 'string') {
    return parseFunction(value, options);
  }

  if (typeof value === 'number') {
    return convertFunction(value);
  }

  return null;
}

module.exports = parser;
