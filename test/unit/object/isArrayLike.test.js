var isArrayLike = fnjs.isArrayLike;

describe('isArrayLike', function() {
  it('should be a function', function() {
    expect(isArrayLike).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isArrayLike.length).to.equal(1);
  });

  it('should return `true` when passed an array', function() {
    expect(isArrayLike([])).to.be.true;
    expect(isArrayLike([1, 2, 3])).to.be.true;
    expect(isArrayLike(new Array())).to.be.true;
    expect(isArrayLike(new Array(10))).to.be.true;
  });

  it('should return `true` when passed anything with a numeric `length` property', function() {
    expect(isArrayLike('')).to.be.true;
    expect(isArrayLike('fdsa')).to.be.true;
    expect(isArrayLike(new String('test'))).to.be.true;
    expect(isArrayLike({ length: 1 })).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isArrayLike()).to.be.false;
    expect(isArrayLike(undefined)).to.be.false;
    expect(isArrayLike(null)).to.be.false;
    expect(isArrayLike(function() {})).to.be.false;
    expect(isArrayLike(new Function())).to.be.false;
    expect(isArrayLike(1)).to.be.false;
    expect(isArrayLike(new Number(1))).to.be.false;
    expect(isArrayLike(true)).to.be.false;
    expect(isArrayLike(false)).to.be.false;
    expect(isArrayLike(new Boolean(true))).to.be.false;
    expect(isArrayLike(/a/)).to.be.false;
    expect(isArrayLike(new RegExp('a'))).to.be.false;
    expect(isArrayLike(new Date())).to.be.false;
    expect(isArrayLike(new Error())).to.be.false;
    expect(isArrayLike({ test: 'omg' })).to.be.false;
    expect(isArrayLike(new Object())).to.be.false;
  });
});
