'use strict';

var assert = require('assert');
var bytes = require('../index.js');

describe('Test constructor', function(){
  it('Expect a function', function(){
    assert.equal(typeof bytes, 'function');
  });

  it('Shoud be able to parse a string into a number', function(){
    // This function is testes more accurately in another test suite
    assert.equal(bytes('1kB'), 1000);
  });

  it('Should convert a number into a string', function(){
    // This function is testes more accurately in another test suite
    assert.equal(bytes(1000), '1kB');
  });

  it('Should convert a number into a string with options', function(){
    // This function is testes more accurately in another test suite
    assert.equal(bytes(1000, {unitSeparator: '---'}), '1---kB');
  });
});
