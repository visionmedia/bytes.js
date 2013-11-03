
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

  it('should support floats', function(){
    bytes('1.5mb').should.equal(1.5 * 1024 * 1024);
  })

  it('should allow whitespace', function(){
    bytes('1 mb').should.equal(1024 * 1024);
  })
  it('should be case-insensitive', function(){
    bytes('1KB').should.equal(1 << 10);
    bytes('1Mb').should.equal(1 << 20);
    bytes('1GB').should.equal(1 << 30);
  })
})