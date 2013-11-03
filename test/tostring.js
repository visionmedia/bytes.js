
var bytes = require('..')
  , tb = 1 << 40
  , gb = 1 << 30
  , mb = 1 << 20
  , kb = 1 << 10;

describe('bytes(number)', function () {
  it('should convert numbers < 1024 to `bytes` string', function () {
    bytes(200).should.eql('200B');
  })

  it('should convert numbers >= 1024 to KB string', function () {
    bytes(kb).should.equal('1KB')
    bytes(2 * kb).should.equal('2KB')
  })

  it('should convert numbers >= 1048576 to MB string', function () {
    bytes(mb).should.equal('1MB')
    bytes(2 * mb).should.equal('2MB')
  })

  it('should convert numbers >= (1 << 30) to GB string', function () {
    bytes(gb).should.equal('1GB')
    bytes(2 * gb).should.equal('2GB')
  })

  it('should support floats', function () {
    bytes(1.2 * mb).should.equal('1.2MB')
    bytes(1.2 * kb).should.equal('1.2KB')
  })
})
