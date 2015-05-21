'use strict';

var assert = require('assert');
var parse = require('../lib/byte-parse.js');

describe('Test byte parse function', function(){
  it('Should return null if input invalid', function(){
    assert.strictEqual(parse(undefined), null);
    assert.strictEqual(parse(null), null);
    assert.strictEqual(parse(true), null);
    assert.strictEqual(parse(false), null);
    assert.strictEqual(parse(0), null);
    assert.strictEqual(parse(-1), null);
    assert.strictEqual(parse(1), null);
    assert.strictEqual(parse(10.5), null);
    assert.strictEqual(parse(function(){}), null);
    assert.strictEqual(parse({}), null);
  });

  it('Should parse kB', function(){
    assert.equal(parse('1kb'), 1 * Math.pow(1024, 1));
    assert.equal(parse('1KB'), 1 * Math.pow(1024, 1));
    assert.equal(parse('1Kb'), 1 * Math.pow(1024, 1));
    assert.equal(parse('1kB'), 1 * Math.pow(1024, 1));

    assert.equal(parse('0.5kb'), 0.5 * Math.pow(1024, 1));
    assert.equal(parse('0.5KB'), 0.5 * Math.pow(1024, 1));
    assert.equal(parse('0.5Kb'), 0.5 * Math.pow(1024, 1));
    assert.equal(parse('0.5kB'), 0.5 * Math.pow(1024, 1));

    assert.equal(parse('1.5kb'), 1.5 * Math.pow(1024, 1));
    assert.equal(parse('1.5KB'), 1.5 * Math.pow(1024, 1));
    assert.equal(parse('1.5Kb'), 1.5 * Math.pow(1024, 1));
    assert.equal(parse('1.5kB'), 1.5 * Math.pow(1024, 1));
  });

  it('Should parse MB', function(){
    assert.equal(parse('1mb'), 1 * Math.pow(1024, 2));
    assert.equal(parse('1MB'), 1 * Math.pow(1024, 2));
    assert.equal(parse('1Mb'), 1 * Math.pow(1024, 2));
    assert.equal(parse('1mB'), 1 * Math.pow(1024, 2));
  });

  it('Should parse GB', function(){
    assert.equal(parse('1gb'), 1 * Math.pow(1024, 3));
    assert.equal(parse('1GB'), 1 * Math.pow(1024, 3));
    assert.equal(parse('1Gb'), 1 * Math.pow(1024, 3));
    assert.equal(parse('1gB'), 1 * Math.pow(1024, 3));
  });

  it('Should parse TB', function(){
    assert.equal(parse('1tb'), 1 * Math.pow(1024, 4));
    assert.equal(parse('1TB'), 1 * Math.pow(1024, 4));
    assert.equal(parse('1Tb'), 1 * Math.pow(1024, 4));
    assert.equal(parse('1tB'), 1 * Math.pow(1024, 4));

    assert.equal(parse('0.5tb'), 0.5 * Math.pow(1024, 4));
    assert.equal(parse('0.5TB'), 0.5 * Math.pow(1024, 4));
    assert.equal(parse('0.5Tb'), 0.5 * Math.pow(1024, 4));
    assert.equal(parse('0.5tB'), 0.5 * Math.pow(1024, 4));

    assert.equal(parse('1.5tb'), 1.5 * Math.pow(1024, 4));
    assert.equal(parse('1.5TB'), 1.5 * Math.pow(1024, 4));
    assert.equal(parse('1.5Tb'), 1.5 * Math.pow(1024, 4));
    assert.equal(parse('1.5tB'), 1.5 * Math.pow(1024, 4));
  });

  it('Should assume bytes when no units', function(){
    assert.equal(parse('0'), 0);
    assert.equal(parse('-1'), -1);
    assert.equal(parse('1024'), 1024);
  });

  it('Should accept negative values', function(){
    assert.equal(parse('-1'), -1);
    assert.equal(parse('-1024'), -1024);
    assert.equal(parse('-1.5TB'), -1.5 * Math.pow(1024, 4));
  });

  it('Should allow whitespace', function(){
    assert.equal(parse('1 TB'), 1 * Math.pow(1024, 4));
  });
});
