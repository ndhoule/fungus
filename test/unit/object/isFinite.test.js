var isFinite = fnjs.isFinite;

describe('isFinite', function() {
  it('should be a function', function() {
    expect(isFinite).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isFinite.length).to.equal(1);
  });

  it('should return `true` when passed a finite number', function() {
    expect(isFinite(-100)).to.be.true;
    expect(isFinite(100)).to.be.true;
    expect(isFinite(Number.MAX_SAFE_INTEGER)).to.be.true;
    expect(isFinite(Number.MIN_SAFE_INTEGER)).to.be.true;
    expect(isFinite(9e+200)).to.be.true;
  });

  it('should return `false` when passed a non-number', function() {
    expect(isFinite(NaN)).to.be.false;
    expect(isFinite(undefined)).to.be.false;
    expect(isFinite('0')).to.be.false;
    expect(isFinite('fdsa')).to.be.false;
    expect(isFinite(null)).to.be.false;
    expect(isFinite(undefined)).to.be.false;
    expect(isFinite(/1/)).to.be.false;
  });

  it('should return `false` when passed infinity', function() {
    expect(isFinite(Number.POSITIVE_INFINITY)).to.be.false;
  });

  it('should return `false` when passed negative infinity', function() {
    expect(isFinite(Number.NEGATIVE_INFINITY)).to.be.false;
  });
});
