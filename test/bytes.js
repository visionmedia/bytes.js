'use strict';

var BytesParser = require(__dirname + '/../index.js'),
    expect = require('chai').expect;

describe('Test constructor', function() {

  it('Shoud not be instantiable', function() {
    expect(function() {new BytesParser();}).to.throw();
  });

  it('Shoud be able to parse a string into a number', function() {
    // This function is testes more accuratly in another test suite
    expect(BytesParser.parse('1Kb')).to.equal(1024);
  });

  it('Should convert a number into a string', function() {
    // This function is testes more accuratly in another test suite
    expect(BytesParser.convert(1024)).to.equal('1Kb');
  });
});
