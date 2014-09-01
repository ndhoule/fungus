var existy = fnjs.existy;

describe('existy', function() {
  it('should be a function', function() {
    expect(existy).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(existy.length).to.equal(1);
  });

  it('should return `false` when passed no arguments', function() {
    expect(existy()).to.be.false;
  });

  it('should return `false` when its argument is `undefined`', function() {
    expect(existy(undefined)).to.be.false;
  });

  it('should return `false` when its argument is `null`', function() {
    expect(existy(null)).to.be.false;
  });

  it('should return `true` when its argument is any other value', function() {
    expect(existy('')).to.be.true;
    expect(existy('fdsa')).to.be.true;
    expect(existy(0)).to.be.true;
    expect(existy(1)).to.be.true;
    expect(existy(true)).to.be.true;
    expect(existy(false)).to.be.true;
    expect(existy({})).to.be.true;
  });
});
