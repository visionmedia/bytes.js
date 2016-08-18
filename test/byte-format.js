'use strict';

var assert = require('assert');
var bytes = require('..').withDefaultMode('metric');


describe('Test byte format function', function(){
  var tb = Math.pow(1000, 4),
      gb = Math.pow(1000, 3),
      mb = Math.pow(1000, 2),
      kb = Math.pow(1000, 1);

  var pib = Math.pow(1024, 5),
      tib = Math.pow(1024, 4),
      gib = 1 << 30,
      mib = 1 << 20,
      kib = 1 << 10;

  it('Should return null if input invalid', function(){
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

  it('Should convert numbers < 1 000 to `bytes` string', function(){
    assert.equal(bytes.format(0).toLowerCase(), '0b');
    assert.equal(bytes.format(100).toLowerCase(), '100b');
    assert.equal(bytes.format(-100).toLowerCase(), '-100b');
  });

  it('Should convert numbers >= 1 000 to kb string', function(){
    assert.equal(bytes.format(kb).toLowerCase(), '1kb');
    assert.equal(bytes.format(-kb).toLowerCase(), '-1kb');
    assert.equal(bytes.format(2 * kb).toLowerCase(), '2kb');
  });

  it('Should convert numbers >= 1 000 000 to mb string', function(){
    assert.equal(bytes.format(mb).toLowerCase(), '1mb');
    assert.equal(bytes.format(-mb).toLowerCase(), '-1mb');
    assert.equal(bytes.format(2 * mb).toLowerCase(), '2mb');
  });

  it('Should convert numbers >= 1000^3 to gb string', function(){
    assert.equal(bytes.format(gb).toLowerCase(), '1gb');
    assert.equal(bytes.format(-gb).toLowerCase(), '-1gb');
    assert.equal(bytes.format(2 * gb).toLowerCase(), '2gb');
  });

  it('Should convert numbers >= 1000^4 to tb string', function(){
    assert.equal(bytes.format(tb).toLowerCase(), '1tb');
    assert.equal(bytes.format(-tb).toLowerCase(), '-1tb');
    assert.equal(bytes.format(2 * tb).toLowerCase(), '2tb');
  });

  it('Should return standard case', function(){
    assert.equal(bytes.format(10), '10B');
    assert.equal(bytes.format(kb), '1kB');
    assert.equal(bytes.format(mb), '1MB');
    assert.equal(bytes.format(gb), '1GB');
    assert.equal(bytes.format(tb), '1TB');
  });

  it('Should support compatibility mode', function(){
    assert.equal(bytes.format(2.2 * kib, {mode: 'compatibility'}).toLowerCase(), '2.2kb');
    assert.equal(bytes.format(mib, {mode: 'compatibility'}).toLowerCase(), '1mb');
    assert.equal(bytes.format(gib, {mode: 'compatibility'}).toLowerCase(), '1gb');
    assert.equal(bytes.format(tib, {mode: 'compatibility'}).toLowerCase(), '1tb');
    assert.equal(bytes.format(pib, {mode: 'compatibility'}).toLowerCase(), '1024tb');
  });

  it('Should support metric mode', function(){
    assert.equal(bytes.format(gb, {mode: 'metric'}).toLowerCase(), '1gb');
    assert.equal(bytes.format(gb, {mode: 'metric'}).toLowerCase(), '1gb');
  });

  it('Should support decimal (alias for metric) mode', function(){
    assert.equal(bytes.format(gb, {mode: 'decimal'}).toLowerCase(), '1gb');
  });

  it('Should support binary mode', function(){
    assert.equal(bytes.format(kib, {mode: 'binary'}).toLowerCase(), '1kib');
    assert.equal(bytes.format(gib, {mode: 'binary'}).toLowerCase(), '1gib');
  });

  it('Should support using a specific unit', function(){
    assert.equal(bytes.format(2.2 * kb, {unit: 'B'}).toLowerCase(), '2200b');
    assert.equal(bytes.format(100 * kb, {unit: 'MB'}).toLowerCase(), '0.1mb');
    assert.equal(bytes.format(kib, {unit: 'B'}).toLowerCase(), '1024b');
    assert.equal(bytes.format(1024 * kb, {unit: 'kB'}).toLowerCase(), '1024kb');
  });

  it('Should allow units to be case insensitive', function(){
    assert.equal(bytes.format(kib, {unit: 'b'}).toLowerCase(), '1024b');
    assert.equal(bytes.format(kib, {unit: 'B'}).toLowerCase(), '1024b');
    assert.equal(bytes.format(kb, {unit: 'kB'}).toLowerCase(), '1kb');
  });

  it('Should support using a specific unit in compatibility mode', function(){
    assert.equal(bytes.format(1, {unit: 'b', mode:'compatibility'}).toLowerCase(), '1b');
    assert.equal(bytes.format(kib, {unit: 'kb', mode:'compatibility'}).toLowerCase(), '1kb');
    assert.equal(bytes.format(mib, {unit: 'mb', mode:'compatibility'}).toLowerCase(), '1mb');
    assert.equal(bytes.format(gib, {unit: 'gb', mode:'compatibility'}).toLowerCase(), '1gb');
    assert.equal(bytes.format(tib, {unit: 'tb', mode:'compatibility'}).toLowerCase(), '1tb');
  });

  it('Should support other units in compatibility mode', function(){
    assert.equal(bytes.format(kib, {unit: 'kib', mode:'compatibility'}).toLowerCase(), '1kib');
    assert.equal(bytes.format(tib, {unit: 'tib', mode:'compatibility'}).toLowerCase(), '1tib');
  });

  it('Support custom thousands separator', function(){
    assert.equal(bytes.format(1000, {mode: 'binary'}).toLowerCase(), '1000b');
    assert.equal(bytes.format(1000, {mode: 'binary', thousandsSeparator: ''}).toLowerCase(), '1000b');
    assert.equal(bytes.format(1000, {mode: 'binary', thousandsSeparator: null}).toLowerCase(), '1000b');
    assert.equal(bytes.format(1000, {mode: 'binary', thousandsSeparator: '.'}).toLowerCase(), '1.000b');
    assert.equal(bytes.format(1000, {mode: 'binary', thousandsSeparator: ','}).toLowerCase(), '1,000b');
    assert.equal(bytes.format(1000, {mode: 'binary', thousandsSeparator: ' '}).toLowerCase(), '1 000b');
  });

  it('Should custom unit separator', function(){
    assert.equal(bytes.format(kb), '1kB');
    assert.equal(bytes.format(kb, {unitSeparator: ''}), '1kB');
    assert.equal(bytes.format(kb, {unitSeparator: null}), '1kB');
    assert.equal(bytes.format(kb, {unitSeparator: ' '}), '1 kB');
    assert.equal(bytes.format(kb, {unitSeparator: '\t'}), '1\tkB');
  });

  it('Should support custom number of decimal places', function(){
    assert.equal(bytes.format(kb - 1, {decimalPlaces: 0}).toLowerCase(), '999b');
    assert.equal(bytes.format(kib, {decimalPlaces: 0}).toLowerCase(), '1kb');
    assert.equal(bytes.format(kb, {decimalPlaces: 0}).toLowerCase(), '1kb');
    assert.equal(bytes.format(1.4 * kb, {decimalPlaces: 0}).toLowerCase(), '1kb');
    assert.equal(bytes.format(1.5 * kb, {decimalPlaces: 0}).toLowerCase(), '2kb');

    assert.equal(bytes.format(kb - 1, {decimalPlaces: 1}).toLowerCase(), '999b');
    assert.equal(bytes.format(kib, {decimalPlaces: 1}).toLowerCase(), '1kb');
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
  });
});

