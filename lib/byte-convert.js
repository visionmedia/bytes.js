'use strict';

var extend = require('node.extend');

/**
 * Default options.
 *
 * @type {{case: string, thousandSeparator: ?string}}
 */
var defaultOptions = {
  case: 'capitalize',
  thousandSeparator: ' '
};

/**
 * Convert the value given in bytes into bytes, Kb, Mg, Gb or Tb.
 *
 * @param {number} value Value to convert.
 *
 * @returns {{value: number, unit: string}} The converted value and the second the unit.
 */
function convertValue(value) {

  var tbValue  = ((1 << 30) * 1024),
      gbValue  = 1 << 30,
      mbValue  = 1 << 20,
      kbValue  = 1 << 10,
      absValue = Math.abs(value),
      unit     = 'b';

  if (absValue >= tbValue) {
    value = Math.round(value / tbValue * 100) / 100;
    unit = 'Tb';
  } else if (absValue >= gbValue) {
    value = Math.round(value / gbValue * 100) / 100;
    unit = 'Gb';
  } else if (absValue >= mbValue) {
    value = Math.round(value / mbValue * 100) / 100;
    unit = 'Mb';
  } else if (absValue >= kbValue) {
    value = Math.round(value / kbValue * 100) / 100;
    unit = 'Kb';
  }

  return {
    value: value,
    unit: unit
  };
}

/**
 * @see {@link parser.convert()}
 *
 * @param {number} value Value to convert
 * @param {{
 *  case: ?string=,
 *  thousandSeparator: ?string=
 * }} [options] See byte parser options.
 *
 * @return {string|null}
 * @api public
 */
module.exports = function (value, options) {

  if (typeof value !== 'number') {
    return null;
  }
  options = extend({}, defaultOptions, options);

  var converterResult = convertValue(value),
      convertedValue = converterResult.value,
      unit = converterResult.unit;

  // Place thousands separator
  if (options.thousandSeparator) {
    convertedValue = convertedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandSeparator);
  }

  // Format the unit value
  switch(options.case) {

    case 'uppercase':
      unit = unit.toUpperCase();
      break;

    case 'lowercase':
      unit = unit.toLowerCase();
      break;

    case 'capitalize':
    default:
    // Do nothing
  }

  return convertedValue + unit;
};
