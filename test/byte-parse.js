'use strict';

var parse = require(__dirname + '/../lib/byte-parse.js'),
    expect = require('chai').expect;

describe('Test byte parse function', function() {

  it('Should return null if input invalid', function() {
    var inputs = invalidValuesProvider();
    for (var k in inputs) {
      expect(parse(inputs[k])).to.be.null;
    }
  });

  it('Should parse Kb', function() {

    var inputs = givePossibleStringValues(1, 'Kb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(1 * Math.pow(1024, 1));
    }

    inputs = givePossibleStringValues(0.5, 'Kb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(0.5 * Math.pow(1024, 1));
    }

    inputs = givePossibleStringValues(1.5, 'Kb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(1.5 * Math.pow(1024, 1));
    }
  });

  it('Should parse Mb', function() {

    var inputs = givePossibleStringValues(1, 'Mb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(Math.pow(1024, 2));
    }
  });

  it('Should parse Gb', function() {
    var inputs = givePossibleStringValues(1, 'Gb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(Math.pow(1024, 3));
    }
  });

  it('Should parse Tb', function() {

    var inputs = givePossibleStringValues(1, 'Tb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(Math.pow(1024, 4));
    }

    inputs = givePossibleStringValues(0.5, 'Tb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(0.5 * Math.pow(1024, 4));
    }

    inputs = givePossibleStringValues(1.5, 'Tb');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(1.5 * Math.pow(1024, 4));
    }
  });

  it('Should assume bytes when no units', function() {
    expect(parse('0')).to.equal(0);
    expect(parse('-1')).to.equal(-1);
    expect(parse('1024')).to.equal(1024);
  });

  it('Should accept negative values', function() {
    expect(parse('-1')).to.equal(-1);
    expect(parse('-1024')).to.equal(-1024);
    expect(parse('-1.5Tb')).to.equal(-1.5 * Math.pow(1024, 4));
  });

  it('Should allow whitespace', function() {
    expect(parse('1 Tb')).to.equal(1 * Math.pow(1024, 4));
  });
});

/**
 * Return invalid input values.
 *
 * @returns {*[]}
 */
function invalidValuesProvider() {

  return [undefined, null, true, false, 0, -1, 1, 10.5, function() {}, {}];
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
