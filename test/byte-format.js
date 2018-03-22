'use strict';

var assert = require('assert');
var bytes = require('..');

describe('Test byte format function', function(){
  var tb = (1 << 30) * 1024,
      gb = 1 << 30,
      mb = 1 << 20,
      kb = 1 << 10;

  it('Should return null if input is invalid', function(){
    assert.strictEqual(bytes.format(undefined), null);
    assert.strictEqual(bytes.format(null), null);
    assert.strictEqual(bytes.format(true), null);
    assert.strictEqual(bytes.format(false), null);
    assert.strictEqual(bytes.format(NaN), null);
    assert.strictEqual(bytes.format(Infinity), null);
    assert.strictEqual(bytes.format(''), null);
    assert.strictEqual(bytes.format('string'), null);
    assert.strictEqual(bytes.format(function(){}), null);
    assert.strictEqual(bytes.format({}), null);
  });

  it('Should convert numbers < 1024 to `bytes` string', function(){
    assert.equal(bytes.format(0).toLowerCase(), '0b');
    assert.equal(bytes.format(100).toLowerCase(), '100b');
    assert.equal(bytes.format(-100).toLowerCase(), '-100b');
  });

  it('Should convert numbers >= 1 024 to kb string', function(){
    assert.equal(bytes.format(kb).toLowerCase(), '1kb');
    assert.equal(bytes.format(-kb).toLowerCase(), '-1kb');
    assert.equal(bytes.format(2 * kb).toLowerCase(), '2kb');
  });

  it('Should convert numbers >= 1 048 576 to mb string', function(){
    assert.equal(bytes.format(mb).toLowerCase(), '1mb');
    assert.equal(bytes.format(-mb).toLowerCase(), '-1mb');
    assert.equal(bytes.format(2 * mb).toLowerCase(), '2mb');
  });

  it('Should convert numbers >= (1 << 30) to gb string', function(){
    assert.equal(bytes.format(gb).toLowerCase(), '1gb');
    assert.equal(bytes.format(-gb).toLowerCase(), '-1gb');
    assert.equal(bytes.format(2 * gb).toLowerCase(), '2gb');
  });

  it('Should convert numbers >= ((1 << 30) * 1024) to tb string', function(){
    assert.equal(bytes.format(tb).toLowerCase(), '1tb');
    assert.equal(bytes.format(-tb).toLowerCase(), '-1tb');
    assert.equal(bytes.format(2 * tb).toLowerCase(), '2tb');
  });

  it('Should return standard case', function(){
    assert.equal(bytes.format(10), '10B');
    assert.equal(bytes.format(kb), '1KB');
    assert.equal(bytes.format(mb), '1MB');
    assert.equal(bytes.format(gb), '1GB');
    assert.equal(bytes.format(tb), '1TB');
  });

  it('Should support custom thousands separator', function(){
    assert.equal(bytes.format(1000).toLowerCase(), '1000b');
    assert.equal(bytes.format(1000, {thousandsSeparator: ''}).toLowerCase(), '1000b');
    assert.equal(bytes.format(1000, {thousandsSeparator: null}).toLowerCase(), '1000b');
    assert.equal(bytes.format(1000, {thousandsSeparator: '.'}).toLowerCase(), '1.000b');
    assert.equal(bytes.format(1000, {thousandsSeparator: ','}).toLowerCase(), '1,000b');
    assert.equal(bytes.format(1000, {thousandsSeparator: ' '}).toLowerCase(), '1 000b');
  });

  it('Should support custom unit separator', function(){
    assert.equal(bytes.format(1024), '1KB');
    assert.equal(bytes.format(1024, {unitSeparator: ''}), '1KB');
    assert.equal(bytes.format(1024, {unitSeparator: null}), '1KB');
    assert.equal(bytes.format(1024, {unitSeparator: ' '}), '1 KB');
    assert.equal(bytes.format(1024, {unitSeparator: '\t'}), '1\tKB');
  });

  it('Should support custom number of decimal places', function(){
    assert.equal(bytes.format(kb - 1, {decimalPlaces: 0}).toLowerCase(), '1023b');
    assert.equal(bytes.format(kb, {decimalPlaces: 0}).toLowerCase(), '1kb');
    assert.equal(bytes.format(1.4 * kb, {decimalPlaces: 0}).toLowerCase(), '1kb');
    assert.equal(bytes.format(1.5 * kb, {decimalPlaces: 0}).toLowerCase(), '2kb');
    assert.equal(bytes.format(kb - 1, {decimalPlaces: 1}).toLowerCase(), '1023b');
    assert.equal(bytes.format(kb, {decimalPlaces: 1}).toLowerCase(), '1kb');
    assert.equal(bytes.format(1.04 * kb, {decimalPlaces: 1}).toLowerCase(), '1kb');
    assert.equal(bytes.format(1.05 * kb, {decimalPlaces: 1}).toLowerCase(), '1.1kb');
  });

  it('Should support fixed decimal places', function(){
    assert.equal(bytes.format(kb, {decimalPlaces: 3, fixedDecimals: true}).toLowerCase(), '1.000kb');
  });

  it('Should support floats', function(){
    assert.equal(bytes.format(1.2 * mb).toLowerCase(), '1.2mb');
    assert.equal(bytes.format(-1.2 * mb).toLowerCase(), '-1.2mb');
    assert.equal(bytes.format(1.2 * kb).toLowerCase(), '1.2kb');
  })

  it('Should support custom unit', function(){
    assert.equal(bytes.format(12 * mb, {unit: 'b'}).toLowerCase(), '12582912b');
    assert.equal(bytes.format(12 * mb, {unit: 'kb'}).toLowerCase(), '12288kb');
    assert.equal(bytes.format(12 * gb, {unit: 'mb'}).toLowerCase(), '12288mb');
    assert.equal(bytes.format(12 * tb, {unit: 'gb'}).toLowerCase(), '12288gb');
    assert.equal(bytes.format(12 * mb, {unit: ''}).toLowerCase(), '12mb');
    assert.equal(bytes.format(12 * mb, {unit: 'bb'}).toLowerCase(), '12mb');
  })

  it('Should support return object', function() {
    assert.deepEqual(bytes.format(1000, { outputAsObject: true }), {value: '1000',unit: 'B'});
    assert.equal(bytes.format(1000, {outputAsObject: false}).toLowerCase(), '1000b');
    assert.deepEqual(bytes.format(1024, { outputAsObject: true }), {value: '1',unit: 'KB'});
    assert.equal(bytes.format(1024, {outputAsObject: false}).toLowerCase(), '1kb');
  })
});
