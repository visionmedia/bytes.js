'use strict';

var bytes = require(__dirname + '/../index.js'),
    expect = require('chai').expect;

describe('Test constructor', function(){
  it('Expect a function', function(){
    expect(typeof bytes).to.equal('function');
    expect(new bytes()).to.be.empty;
  });

  it('Shoud be able to parse a string into a number', function(){
    // This function is testes more accuratly in another test suite
    expect(bytes('1kB')).to.equal(1024);
  });

  it('Should convert a number into a string', function(){
    // This function is testes more accuratly in another test suite
    expect(bytes(1024)).to.equal('1kB');
  });

  it('Should convert a number into a string with options', function(){
    // This function is testes more accuratly in another test suite
    expect(bytes(1000, {thousandsSeparator: ' '})).to.equal('1 000B');
  });
});
