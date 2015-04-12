'use strict';

var parse = require(__dirname + '/../lib/byte-parse.js'),
    expect = require('chai').expect;

describe('Test byte parse function', function(){

  it('Should return null if input invalid', function(){
    var inputs = invalidValuesProvider();
    for (var k in inputs) {
      expect(parse(inputs[k])).to.be.null;
    }
  });

  it('Should parse kB', function(){

    var inputs = givePossibleStringValues(1, 'kB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(1 * Math.pow(1024, 1));
    }

    inputs = givePossibleStringValues(0.5, 'kB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(0.5 * Math.pow(1024, 1));
    }

    inputs = givePossibleStringValues(1.5, 'kB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(1.5 * Math.pow(1024, 1));
    }
  });

  it('Should parse MB', function(){

    var inputs = givePossibleStringValues(1, 'MB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(Math.pow(1024, 2));
    }
  });

  it('Should parse GB', function(){
    var inputs = givePossibleStringValues(1, 'GB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(Math.pow(1024, 3));
    }
  });

  it('Should parse TB', function(){

    var inputs = givePossibleStringValues(1, 'TB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(Math.pow(1024, 4));
    }

    inputs = givePossibleStringValues(0.5, 'TB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(0.5 * Math.pow(1024, 4));
    }

    inputs = givePossibleStringValues(1.5, 'TB');
    for (var k in inputs) {
      expect(parse(inputs[k])).to.equal(1.5 * Math.pow(1024, 4));
    }
  });

  it('Should assume bytes when no units', function(){
    expect(parse('0')).to.equal(0);
    expect(parse('-1')).to.equal(-1);
    expect(parse('1024')).to.equal(1024);
  });

  it('Should accept negative values', function(){
    expect(parse('-1')).to.equal(-1);
    expect(parse('-1024')).to.equal(-1024);
    expect(parse('-1.5TB')).to.equal(-1.5 * Math.pow(1024, 4));
  });

  it('Should allow whitespace', function(){
    expect(parse('1 TB')).to.equal(1 * Math.pow(1024, 4));
  });
});

/**
 * Return invalid input values.
 *
 * @returns {*[]}
 */
function invalidValuesProvider() {

  return [undefined, null, true, false, 0, -1, 1, 10.5, function(){}, {}];
}

/**
 * Return possible combinations for the given value and unit.
 *
 * @param {number} value Value.
 * @param {string} units Unit in which the value will be. Expect to be a 2 characters long string.
 *
 * @returns {string[]} Results
 */
function givePossibleStringValues(value, units) {

  var unitsArray = [
    units.toLowerCase(),
    units.toUpperCase()
  ];

  // Set first letter uppercase and second lowercase
  var string = units.toLocaleLowerCase();
  string = string.charAt(0).toUpperCase() + string.slice(1);
  unitsArray.push(string);

  // Set first letter lowercase and second uppercase
  string = units.toLocaleLowerCase();
  string = string.slice(0, 1) + string.charAt(1).toUpperCase();
  unitsArray.push(string);

  var returnedValue = [];

  for (var k in unitsArray) {
    returnedValue.push(value.toString() + unitsArray[k]);
  }

  return returnedValue;
}
