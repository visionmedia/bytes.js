
var bytes = require('..')
  , gb = 1 << 30
  , mb = 1 << 20
  , kb = 1 << 10;

describe('bytes(number)', function () {
  it('should convert numbers >= 1024 to kb string', function () {
    bytes(kb).should.equal('1kb')
    bytes(2 * kb).should.equal('2kb')
  })

  it('should convert numbers >= 1048576 to mb string', function () {
    bytes(mb).should.equal('1mb')
    bytes(2 * mb).should.equal('2mb')
  })

  it('should convert numbers >= (1 << 30) to gb string', function () {
    bytes(gb).should.equal('1gb')
    bytes(2 * gb).should.equal('2gb')
  })
i
  it('should support floats', function () {
    bytes(1.2 * mb).should.equal('1.2mb')
    bytes(1.2 * kb).should.equal('1.2kb')
  })
})