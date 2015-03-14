'use strict';

var convert = require(__dirname + '/../lib/byte-convert.js'),
    expect = require('chai').expect;

describe('Test byte convert function', function() {

  var tb = (1 << 30) * 1024,
      gb = 1 << 30,
      mb = 1 << 20,
      kb = 1 << 10;

  it('Should return null if input invalid', function() {
    var inputs = invalidValuesProvider();
    for (var k in inputs) {
      expect(convert(inputs[k])).be.null;
    }
  });

  it('Should convert numbers < 1024 to `bytes` string', function() {
    expect(convert(0).toLowerCase()).to.equal('0b');
    expect(convert(100).toLowerCase()).to.equal('100b');
    expect(convert(-100).toLowerCase()).to.equal('-100b');
  });

  it('Should convert numbers >= 1 024 to kb string', function() {
    expect(convert(kb).toLowerCase()).to.equal('1kb');
    expect(convert(-kb).toLowerCase()).to.equal('-1kb');
    expect(convert(2 * kb).toLowerCase()).to.equal('2kb');
  });

  it('Should convert numbers >= 1 048 576 to mb string', function() {
    expect(convert(mb).toLowerCase()).to.equal('1mb');
    expect(convert(-mb).toLowerCase()).to.equal('-1mb');
    expect(convert(2 * mb).toLowerCase()).to.equal('2mb');
  });

  it('Should convert numbers >= (1 << 30) to gb string', function() {
    expect(convert(gb).toLowerCase()).to.equal('1gb');
    expect(convert(-gb).toLowerCase()).to.equal('-1gb');
    expect(convert(2 * gb).toLowerCase()).to.equal('2gb');
  });

  it('Should convert numbers >= ((1 << 30) * 1024) to tb string', function() {
    expect(convert(tb).toLowerCase()).to.equal('1tb');
    expect(convert(-tb).toLowerCase()).to.equal('-1tb');
    expect(convert(2 * tb).toLowerCase()).to.equal('2tb');
  });

  it('Should return capitalize case by default', function() {
    expect(convert(10)).to.equal('10b');
    expect(convert(kb)).to.equal('1Kb');
    expect(convert(mb)).to.equal('1Mb');
    expect(convert(gb)).to.equal('1Gb');
    expect(convert(tb)).to.equal('1Tb');
  });

  it('Support lowercase option', function() {
    expect(convert(10, {case: 'lowercase'})).to.equal('10b');
    expect(convert(kb, {case: 'lowercase'})).to.equal('1kb');
    expect(convert(mb, {case: 'lowercase'})).to.equal('1mb');
    expect(convert(gb, {case: 'lowercase'})).to.equal('1gb');
    expect(convert(tb, {case: 'lowercase'})).to.equal('1tb');
  });

  it('Support uppercase option', function() {
    expect(convert(10, {case: 'uppercase'})).to.equal('10B');
    expect(convert(kb, {case: 'uppercase'})).to.equal('1KB');
    expect(convert(mb, {case: 'uppercase'})).to.equal('1MB');
    expect(convert(gb, {case: 'uppercase'})).to.equal('1GB');
    expect(convert(tb, {case: 'uppercase'})).to.equal('1TB');
  });

  it('Support custom thousands separator', function() {
    expect(convert(1000).toLowerCase()).to.equal('1 000b');
    expect(convert(1000, {thousandSeparator: '.'}).toLowerCase()).to.equal('1.000b');
    expect(convert(1000, {thousandSeparator: ','}).toLowerCase()).to.equal('1,000b');
    expect(convert(1000, {thousandSeparator: ''}).toLowerCase()).to.equal('1000b');
  });

  it('Should support floats', function() {
    expect(convert(1.2 * mb).toLowerCase()).to.equal('1.2mb');
    expect(convert(-1.2 * mb).toLowerCase()).to.equal('-1.2mb');
    expect(convert(1.2 * kb).toLowerCase()).to.equal('1.2kb');
  })
});

/**
 * Return invalid input values.
 *
 * @returns {*[]}
 */
function invalidValuesProvider() {

  return [undefined, null, true, false, '', 'string', function() {}, {}];
}

/**
 * Converts a string with a uppercase for the first letter of each words.
 *
 * @returns {string}
 */
String.prototype.capitalizeFirstLetter = function capitalizeFirstLetter() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Return possible combinations for the given value and unit.
 *
 * @param {number} value Value.
 * @param {string} units Unit in which the value will be.
 *
 * @returns {string[]} Results
 */
function givePossibleStringValues(value, units) {

  var unitsArray = [
    units.toLowerCase(),
    units.toUpperCase(),
    units.capitalizeFirstLetter()
  ];

  var returnedValue = [];

  for (var k in unitsArray) {
    returnedValue.push(value.toString() + unitsArray[k]);
  }

  return returnedValue;
}


//
//var bytes = require('..')

//describe('bytes(number)', function () {

//})
