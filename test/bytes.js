'use strict';

var assert = require('assert');
var bytes = require('../index.js');

describe('Test constructor', function(){
  it('Expect a function', function(){
    assert.equal(typeof bytes, 'function');
  });

  it('Should return null if input is invalid', function(){
    assert.strictEqual(bytes(undefined), null);
    assert.strictEqual(bytes(null), null);
    assert.strictEqual(bytes(true), null);
    assert.strictEqual(bytes(false), null);
    assert.strictEqual(bytes(NaN), null);
    assert.strictEqual(bytes(function(){}), null);
    assert.strictEqual(bytes({}), null);
  });

  it('Should be able to parse a string into a number', function(){
    // This function is tested more accurately in another test suite
    assert.equal(bytes('1KB'), 1024);
  });

  it('Should convert a number into a string', function(){
    // This function is tested more accurately in another test suite
    assert.equal(bytes(1024), '1KB');
  });

  it('Should convert a number into a string with options', function(){
    // This function is tested more accurately in another test suite
    assert.equal(bytes(1000, {thousandsSeparator: ' '}), '1 000B');
  });
});
