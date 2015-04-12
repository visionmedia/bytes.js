'use strict';

/**
 * @see {@link parser.parse()}
 *
 * @param {string} stringValue
 * @returns {number|null}
 */

module.exports = function(stringValue) {

  // Expect value to be a string
  if (typeof stringValue !== 'string') {
    return null;
  }

  // Test if the string passed is valid
  var results = stringValue.match(/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb)$/i);
  var floatValue;
  var unit = 'b';

  if (!results) {
    // Nothing could be extracted from the given string
    floatValue = parseInt(stringValue);
    unit = 'b'
  } else {
    // Retrieve the value and the unit
    floatValue = parseFloat(results[1]);
    unit       = results[4].toLowerCase();
  }

  var map = {
    b:  1,
    kb: 1 << 10,
    mb: 1 << 20,
    gb: 1 << 30,
    tb: ((1 << 30) * 1024)
  };

  return map[unit] * floatValue;
};
