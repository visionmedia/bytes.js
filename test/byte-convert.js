'use strict';

var assert = require('assert');
var convert = require('../lib/byte-convert.js');

describe('Test byte convert function', function(){
  var tb = (1 << 30) * 1024,
      gb = 1 << 30,
      mb = 1 << 20,
      kb = 1 << 10;

  it('Should return null if input invalid', function(){
    assert.strictEqual(convert(undefined), null);
    assert.strictEqual(convert(null), null);
    assert.strictEqual(convert(true), null);
    assert.strictEqual(convert(false), null);
    assert.strictEqual(convert(''), null);
    assert.strictEqual(convert('string'), null);
    assert.strictEqual(convert(function(){}), null);
    assert.strictEqual(convert({}), null);
  });

  it('Should convert numbers < 1024 to `bytes` string', function(){
    assert.equal(convert(0).toLowerCase(), '0b');
    assert.equal(convert(100).toLowerCase(), '100b');
    assert.equal(convert(-100).toLowerCase(), '-100b');
  });

  it('Should convert numbers >= 1 024 to kb string', function(){
    assert.equal(convert(kb).toLowerCase(), '1kb');
    assert.equal(convert(-kb).toLowerCase(), '-1kb');
    assert.equal(convert(2 * kb).toLowerCase(), '2kb');
  });

  it('Should convert numbers >= 1 048 576 to mb string', function(){
    assert.equal(convert(mb).toLowerCase(), '1mb');
    assert.equal(convert(-mb).toLowerCase(), '-1mb');
    assert.equal(convert(2 * mb).toLowerCase(), '2mb');
  });

  it('Should convert numbers >= (1 << 30) to gb string', function(){
    assert.equal(convert(gb).toLowerCase(), '1gb');
    assert.equal(convert(-gb).toLowerCase(), '-1gb');
    assert.equal(convert(2 * gb).toLowerCase(), '2gb');
  });

  it('Should convert numbers >= ((1 << 30) * 1024) to tb string', function(){
    assert.equal(convert(tb).toLowerCase(), '1tb');
    assert.equal(convert(-tb).toLowerCase(), '-1tb');
    assert.equal(convert(2 * tb).toLowerCase(), '2tb');
  });

  it('Should return standard case', function(){
    assert.equal(convert(10), '10B');
    assert.equal(convert(kb), '1kB');
    assert.equal(convert(mb), '1MB');
    assert.equal(convert(gb), '1GB');
    assert.equal(convert(tb), '1TB');
  });

  it('Support custom thousands separator', function(){
    assert.equal(convert(1000).toLowerCase(), '1000b');
    assert.equal(convert(1000, {thousandsSeparator: ''}).toLowerCase(), '1000b');
    assert.equal(convert(1000, {thousandsSeparator: null}).toLowerCase(), '1000b');
    assert.equal(convert(1000, {thousandsSeparator: '.'}).toLowerCase(), '1.000b');
    assert.equal(convert(1000, {thousandsSeparator: ','}).toLowerCase(), '1,000b');
    assert.equal(convert(1000, {thousandsSeparator: ' '}).toLowerCase(), '1 000b');
  });

  it('Should support floats', function(){
    assert.equal(convert(1.2 * mb).toLowerCase(), '1.2mb');
    assert.equal(convert(-1.2 * mb).toLowerCase(), '-1.2mb');
    assert.equal(convert(1.2 * kb).toLowerCase(), '1.2kb');
  })
});
