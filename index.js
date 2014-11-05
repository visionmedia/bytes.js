
var map_binary = {
        kb: 1 << 10,
        mb: 1 << 20,
        gb: 1 << 30,
        tb: ((1 << 30) * 1024)
    },
    map_decimal = {
        kb: Math.pow(10, 3),
        mb: Math.pow(10, 6),
        gb: Math.pow(10, 9),
        tb: Math.pow(10, 12)
    };

/**
 * Parse byte `size` string.
 *
 * @param {String} size
 * @return {Number}
 * @api public
 */

module.exports = function (size, decimal) {
  if ('number' == typeof size) return convert(size, decimal);
  var parts = size.toLowerCase().match(/^(\d+(?:\.\d+)?) *(kb|mb|gb|tb)$/)
    , n = parseFloat(parts[1])
    , type = parts[2];

  var map = decimal ? map_decimal : map_binary;

  return map[type] * n;
}

/**
 * convert bytes into string.
 *
 * @param {Number} b - bytes to convert
 * @param {Boolean} decimal - base-2 if false; base-10 if true
 * @return {String}
 * @api public
 */

function convert (b, decimal) {
  var map = decimal ? map_decimal : map_binary,
      abs = Math.abs(b);

  if (abs >= map.tb) return (Math.round(b / map.tb * 100) / 100) + ' TB';
  if (abs >= map.gb) return (Math.round(b / map.gb * 100) / 100) + ' GB';
  if (abs >= map.mb) return (Math.round(b / map.mb * 100) / 100) + ' MB';
  if (abs >= map.kb) return (Math.round(b / map.kb * 100) / 100) + ' KB';
  return b + 'B';
}