'use strict';

var assert = require('assert');
var bytes = require('..');

describe('Test byte parse function', function(){
  it('Should return null if input is invalid', function(){
    assert.strictEqual(bytes.parse(undefined), null);
    assert.strictEqual(bytes.parse(null), null);
    assert.strictEqual(bytes.parse(true), null);
    assert.strictEqual(bytes.parse(false), null);
    assert.strictEqual(bytes.parse(NaN), null);
    assert.strictEqual(bytes.parse(function(){}), null);
    assert.strictEqual(bytes.parse({}), null);
  });

  it('Should parse raw number', function(){
    assert.strictEqual(bytes.parse(0), 0);
    assert.strictEqual(bytes.parse(-1), -1);
    assert.strictEqual(bytes.parse(1), 1);
    assert.strictEqual(bytes.parse(10.5), 10.5);
  });

  it('Should parse KB', function(){
    assert.equal(bytes.parse('1kb'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1KB'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1Kb'), 1 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1kB'), 1 * Math.pow(1024, 1));

    assert.equal(bytes.parse('0.5kb'), 0.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('0.5KB'), 0.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('0.5Kb'), 0.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('0.5kB'), 0.5 * Math.pow(1024, 1));

    assert.equal(bytes.parse('1.5kb'), 1.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1.5KB'), 1.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1.5Kb'), 1.5 * Math.pow(1024, 1));
    assert.equal(bytes.parse('1.5kB'), 1.5 * Math.pow(1024, 1));
  });

  it('Should parse MB', function(){
    assert.equal(bytes.parse('1mb'), 1 * Math.pow(1024, 2));
    assert.equal(bytes.parse('1MB'), 1 * Math.pow(1024, 2));
    assert.equal(bytes.parse('1Mb'), 1 * Math.pow(1024, 2));
    assert.equal(bytes.parse('1mB'), 1 * Math.pow(1024, 2));
  });

  it('Should parse GB', function(){
    assert.equal(bytes.parse('1gb'), 1 * Math.pow(1024, 3));
    assert.equal(bytes.parse('1GB'), 1 * Math.pow(1024, 3));
    assert.equal(bytes.parse('1Gb'), 1 * Math.pow(1024, 3));
    assert.equal(bytes.parse('1gB'), 1 * Math.pow(1024, 3));
  });

  it('Should parse TB', function(){
    assert.equal(bytes.parse('1tb'), 1 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1TB'), 1 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1Tb'), 1 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1tB'), 1 * Math.pow(1024, 4));

    assert.equal(bytes.parse('0.5tb'), 0.5 * Math.pow(1024, 4));
    assert.equal(bytes.parse('0.5TB'), 0.5 * Math.pow(1024, 4));
    assert.equal(bytes.parse('0.5Tb'), 0.5 * Math.pow(1024, 4));
    assert.equal(bytes.parse('0.5tB'), 0.5 * Math.pow(1024, 4));

    assert.equal(bytes.parse('1.5tb'), 1.5 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1.5TB'), 1.5 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1.5Tb'), 1.5 * Math.pow(1024, 4));
    assert.equal(bytes.parse('1.5tB'), 1.5 * Math.pow(1024, 4));
  });

  it('Should parse PB', function(){
    assert.equal(bytes.parse('1pb'), 1 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1PB'), 1 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1Pb'), 1 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1pB'), 1 * Math.pow(1024, 5));

    assert.equal(bytes.parse('0.5pb'), 0.5 * Math.pow(1024, 5));
    assert.equal(bytes.parse('0.5PB'), 0.5 * Math.pow(1024, 5));
    assert.equal(bytes.parse('0.5Pb'), 0.5 * Math.pow(1024, 5));
    assert.equal(bytes.parse('0.5pB'), 0.5 * Math.pow(1024, 5));

    assert.equal(bytes.parse('1.5pb'), 1.5 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1.5PB'), 1.5 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1.5Pb'), 1.5 * Math.pow(1024, 5));
    assert.equal(bytes.parse('1.5pB'), 1.5 * Math.pow(1024, 5));
  });

  it('Should assume bytes when no units', function(){
    assert.equal(bytes.parse('0'), 0);
    assert.equal(bytes.parse('-1'), -1);
    assert.equal(bytes.parse('1024'), 1024);
    assert.equal(bytes.parse('0x11'), 0);
  });

  it('Should accept negative values', function(){
    assert.equal(bytes.parse('-1'), -1);
    assert.equal(bytes.parse('-1024'), -1024);
    assert.equal(bytes.parse('-1.5TB'), -1.5 * Math.pow(1024, 4));
  });

  it('Should drop partial bytes', function(){
    assert.equal(bytes.parse('1.1b'), 1);
    assert.equal(bytes.parse('1.0001kb'), 1024);
  });

  it('Should allow whitespace', function(){
    assert.equal(bytes.parse('1 TB'), 1 * Math.pow(1024, 4));
  });
});
