var isNaN = fungus.isNaN;

describe('isNaN', function() {
  it('should be a function', function() {
    expect(isNaN).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isNaN.length).to.equal(1);
  });

  it('should return `true` when passed NaN', function() {
    expect(isNaN(NaN)).to.be.true;
    expect(isNaN(new Number(NaN))).to.be.true;
  });

  it('should return `false` when passed anything other than NaN', function() {
    expect(isNaN(0)).to.be.false;
    expect(isNaN(1)).to.be.false;
    expect(isNaN(-1)).to.be.false;
    expect(isNaN(new Number())).to.be.false;
    expect(isNaN(new Number(1))).to.be.false;
    expect(isNaN(Infinity)).to.be.false;
    expect(isNaN(-Infinity)).to.be.false;
    expect(isNaN()).to.be.false;
    expect(isNaN(undefined)).to.be.false;
    expect(isNaN(null)).to.be.false;
    expect(isNaN('')).to.be.false;
    expect(isNaN('0')).to.be.false;
    expect(isNaN('100')).to.be.false;
    expect(isNaN('fdsa')).to.be.false;
    expect(isNaN(new String('test'))).to.be.false;
    expect(isNaN(true)).to.be.false;
    expect(isNaN(false)).to.be.false;
    expect(isNaN(new Boolean(true))).to.be.false;
    expect(isNaN(/a/)).to.be.false;
    expect(isNaN(new RegExp('a'))).to.be.false;
    expect(isNaN(new Date())).to.be.false;
    expect(isNaN(new Error())).to.be.false;
    expect(isNaN({ test: 'omg' })).to.be.false;
    expect(isNaN(new Object())).to.be.false;
    expect(isNaN([])).to.be.false;
    expect(isNaN([1, 2, 3])).to.be.false;
  });
});
