var falsy = fungus.falsy;

describe('falsy', function() {
  it('should be a function', function() {
    expect(falsy).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(falsy.length).to.equal(1);
  });

  it('should return `true` when passed no arguments', function() {
    expect(falsy()).to.be.true;
  });

  it('should return `true` when its argument is a falsy value', function() {
    expect(falsy(undefined)).to.be.true;
    expect(falsy(null)).to.be.true;
    expect(falsy(false)).to.be.true;
    expect(falsy('')).to.be.true;
    expect(falsy(0)).to.be.true;
    expect(falsy(NaN)).to.be.true;
  });

  it('should return `false` when its argument is any other value', function() {
    expect(falsy('spam')).to.be.false;
    expect(falsy(1)).to.be.false;
    expect(falsy(true)).to.be.false;
    expect(falsy({})).to.be.false;
  });
});
