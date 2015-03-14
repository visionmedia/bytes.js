'use strict';

var bytesParser = require(__dirname + '/../index.js'),
    expect = require('chai').expect;

describe('Test constructor', function() {

  describe('Should be usable as a function', function() {

    it('Should return null if input invalid', function() {
      var inputs = [undefined, null, false, true, function() {}, {}];
      for (var k in inputs) {
        expect(bytesParser(inputs[k])).be.null;
      }
    });

    it('Should parse a string into a number', function() {
      // This function is testes more accuratly in another test suite
      expect(bytesParser('1Kb')).to.equal(1024);
    });

    it('Should convert a number into a string', function() {
      // This function is testes more accuratly in another test suite
      expect(bytesParser(1024)).to.equal('1Kb');
    });
  });

  describe('Should be usable as a class', function() {

    it('Shoud be instantiable', function() {
      var instance = new bytesParser();
    });

    it('Shoud be able to parse a string into a number', function() {
      // This function is testes more accuratly in another test suite
      var instance = new bytesParser();
      expect(instance.parse('1Kb')).to.equal(1024);
    });

    it('Should convert a number into a string', function() {
      // This function is testes more accuratly in another test suite
      var instance = new bytesParser();
      expect(instance.convert(1024)).to.equal('1Kb');
    });
  });
});
