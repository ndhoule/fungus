describe('is', function() {
  var is = fungus.is;

  var nativeIs, args;

  before(function() {
    nativeIs = Object.is;
    Object.is = undefined;
  });

  after(function() {
    Object.is = nativeIs;
  });

  beforeEach(function() {
    args = chai.factory.create('objects.arguments');
  });

  it('should be a function', function() {
    expect(is).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(is).to.have.length(2);
  });

  it('should be curried', function() {
    expect(is).to.be.curried('tim', { a: 1 }, 'boolean');
  });

  it('should return `true` when comparing two `NaN` values', function() {
    expect(is(NaN, NaN)).to.be.true;
  });

  it('should return `false` when comparing `-0` to 0', function() {
    expect(is(0, 0)).to.be.true;
    expect(is(-0, -0)).to.be.true;
    expect(is(-0, 0)).to.be.false;
  });

  it('should return `true` when comparing equivalent values', function() {
    var obj = {};
    expect(is(obj, obj)).to.be.true;
    expect(is(args, args)).to.be.true;
    expect(is(true, true)).to.be.true;
    expect(is(false, false)).to.be.true;
    expect(is('', '')).to.be.true;
    expect(is('fdsa', 'fdsa')).to.be.true;
  });

  it('should return `false` when comparing non-equivalent values', function() {
    var obj = {};
    expect(is(obj, {})).to.be.false;
    expect(is(args, { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 })).to.be.false;
    expect(is('1', 1)).to.be.false;
    expect(is(1, 2)).to.be.false;
    expect(is('fds', 'fdsa')).to.be.false;
  });
});
