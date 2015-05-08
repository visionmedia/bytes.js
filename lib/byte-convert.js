'use strict';

/**
 * Convert the value given in bytes into bytes, KB, MB, GB or TB.
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
      unit     = 'B';

  if (absValue >= tbValue) {
    value = Math.round(value / tbValue * 100) / 100;
    unit = 'TB';
  } else if (absValue >= gbValue) {
    value = Math.round(value / gbValue * 100) / 100;
    unit = 'GB';
  } else if (absValue >= mbValue) {
    value = Math.round(value / mbValue * 100) / 100;
    unit = 'MB';
  } else if (absValue >= kbValue) {
    value = Math.round(value / kbValue * 100) / 100;
    unit = 'kB';
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
 *  thousandsSeparator: string|null
 * }} [options] See byte parser options.
 *
 * @return {string|null}
 * @api public
 */

module.exports = function (value, options) {
  if (typeof value !== 'number') {
    return null;
  }

  var converterResult = convertValue(value);
  var convertedValue = converterResult.value;
  var thousandsSeparator = (options && options.thousandsSeparator) || '';
  var unit = converterResult.unit;

  if (thousandsSeparator) {
    convertedValue = convertedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  }

  return convertedValue + unit;
};
