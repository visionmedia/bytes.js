
var bytes = require('..');

describe('bytes(str)', function(){
  it('should parse kb', function(){
    bytes('1kb').should.equal(1024);
  })

  it('should parse mb', function(){
    bytes('1mb').should.equal(1024 * 1024);
  })

  it('should parse gb', function(){
    bytes('5gb').should.equal(5 * 1024 * 1024 * 1024);
  })

  it('should parse tb', function(){
    bytes('6tb').should.equal(6 * 1024 * 1024 * 1024 * 1024);
  })

  it('should support floats', function(){
    bytes('1.5mb').should.equal(1.5 * 1024 * 1024);
  })

  it('should allow whitespace', function(){
    bytes('1 mb').should.equal(1024 * 1024);
  })
})