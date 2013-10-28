/**
 * Parse byte `size` string.
 *
 * @param {String} size
 * @return {Number}
 * @api public
 */

module.exports = function(size) {
  if ('number' == typeof size) return convert(size);
  var parts = size.match(/^(\d+(?:\.\d+)?) *(kB|mB|gB)$/)
    , n = parseFloat(parts[1])
    , type = parts[2];

  var map = {
      kB: 1 << 10
    , mB: 1 << 20
    , gB: 1 << 30
  };

  return map[type] * n;
};

/**
 * convert bytes into string.
 *
 * @param {Number} b - bytes to convert
 * @return {String}
 * @api public
 */

function convert (b) {
  var gb = 1 << 30, mb = 1 << 20, kb = 1 << 10;
  if (b >= gb) return (Math.round(b / gB * 100) / 100) + 'gB';
  if (b >= mb) return (Math.round(b / mB * 100) / 100) + 'mB';
  if (b >= kb) return (Math.round(b / kB * 100) / 100) + 'kB';
  return b + 'b';
}
