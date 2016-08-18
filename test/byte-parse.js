'use strict';

var assert = require('assert');
var bytes = require('..').withDefaultMode('metric');

describe('Test byte parse function', function(){
  it('Should return null if input invalid', function(){
    assert.strictEqual(bytes.parse(undefined), null);
    assert.strictEqual(bytes.parse(null), null);
    assert.strictEqual(bytes.parse(true), null);
    assert.strictEqual(bytes.parse(false), null);
    assert.strictEqual(bytes.parse(NaN), null);
    assert.strictEqual(bytes.parse(function(){}), null);
    assert.strictEqual(bytes.parse({}), null);
    assert.strictEqual(bytes.parse('0x11'), null);
    assert.strictEqual(bytes.parse('250Kg'), null);
    assert.strictEqual(bytes.parse('250 Kg'), null);
  });

  it('Should parse raw number', function(){
    assert.strictEqual(bytes.parse(0), 0);
    assert.strictEqual(bytes.parse(-1), -1);
    assert.strictEqual(bytes.parse(1), 1);
    assert.strictEqual(bytes.parse(10.5), 10.5);
  });

  it('Should parse bytes', function(){
    assert.equal(bytes.parse('1B'), 1);
    assert.equal(bytes.parse('123B'), 123);
  });

  it('Should parse KiB', function(){
    assert.equal(bytes.parse('1KiB'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('0.5KiB'), 0.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1.5KiB'), 1.5 * Math.pow(1024, 1));
  });

  it('Should parse upper binary units', function(){
    assert.equal(bytes.parse('1MiB'), 1 * Math.pow(1024, 2));
    assert.equal(bytes.parse('1GiB'), 1 * Math.pow(1024, 3));
    assert.equal(bytes.parse('1TiB'), 1 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1PiB'), 1 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1EiB'), 1 * Math.pow(1024, 6));
    assert.equal(bytes.parse('1ZiB'), 1 * Math.pow(1024, 7));
    assert.equal(bytes.parse('1YiB'), 1 * Math.pow(1024, 8));
  });

  it('Should parse kB', function(){
    assert.equal(bytes.parse('1kB'), 1 * Math.pow(1000, 1));
    assert.equal(bytes.parse('0.5kB'), 0.5 * Math.pow(1000, 1));
    assert.equal(bytes.parse('1.5kB'), 1.5 * Math.pow(1000, 1));
  });

  it('Should parse upper metric units', function(){
    assert.equal(bytes.parse('1MB'), 1 * Math.pow(1000, 2));
    assert.equal(bytes.parse('1GB'), 1 * Math.pow(1000, 3));
    assert.equal(bytes.parse('1TB'), 1 * Math.pow(1000, 4));
    assert.equal(bytes.parse('1PB'), 1 * Math.pow(1000, 5));
    assert.equal(bytes.parse('1EB'), 1 * Math.pow(1000, 6));
    assert.equal(bytes.parse('1ZB'), 1 * Math.pow(1000, 7));
    assert.equal(bytes.parse('1YB'), 1 * Math.pow(1000, 8));
  });

  it('Should parse compatibility units', function(){
    assert.equal(bytes.parse('1KB', {mode: 'compatibility'}), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1MB', {mode: 'compatibility'}), 1 * Math.pow(1024, 2));
    assert.equal(bytes.parse('1GB', {mode: 'compatibility'}), 1 * Math.pow(1024, 3));
    assert.equal(bytes.parse('1TB', {mode: 'compatibility'}), 1 * Math.pow(1024, 4));
  });

  it('Should parse remaining normal units in compatibility mode', function(){
    assert.equal(bytes.parse('1B', {mode: 'compatibility'}), 1);
    assert.equal(bytes.parse('1YB', {mode: 'compatibility'}), 1 * Math.pow(1000, 8));
  });

  it('Should assume bytes when no units', function(){
    assert.equal(bytes.parse('0'), 0);
    assert.equal(bytes.parse('-1'), -1);
    assert.equal(bytes.parse('1024'), 1024);
  });

  it('Should accept negative values', function(){
    assert.equal(bytes.parse('-1'), -1);
    assert.equal(bytes.parse('-1024'), -1024);
    assert.equal(bytes.parse('-1.5TB'), -1.5 * Math.pow(1000, 4));
  });

  it('Should drop partial bytes', function(){
    assert.equal(bytes.parse('1.1b'), 1);
    assert.equal(bytes.parse('1.0001kb'), 1000);
  });

  it('Should allow whitespace', function(){
    assert.equal(bytes.parse('1 TiB'), 1 * Math.pow(1024, 4));
  });

  it('Should parse case-insensitively', function(){
    assert.equal(bytes.parse('1kib'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1KiB'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1Kib'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1kiB'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1KIB'), 1 * Math.pow(1024, 1));
  });
});
