var truthy = fnjs.truthy;

describe('truthy', function() {
  it('should be a function', function() {
    expect(truthy).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(truthy.length).to.equal(1);
  });

  it('should return `false` when passed no arguments', function() {
    expect(truthy()).to.be.false;
  });

  it('should return `false` when its argument is a falsy value', function() {
    expect(truthy(undefined)).to.be.false;
    expect(truthy(null)).to.be.false;
    expect(truthy(false)).to.be.false;
    expect(truthy('')).to.be.false;
    expect(truthy(0)).to.be.false;
    expect(truthy(NaN)).to.be.false;
  });

  it('should return `true` when its argument is any other value', function() {
    expect(truthy('fdsa')).to.be.true;
    expect(truthy(1)).to.be.true;
    expect(truthy(true)).to.be.true;
    expect(truthy({})).to.be.true;
  });
});
