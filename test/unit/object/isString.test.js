var isString = fnjs.isString;

describe('isString', function() {
  it('should be a function', function() {
    expect(isString).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isString.length).to.equal(1);
  });

  it('should return `true` when passed a string', function() {
    expect(isString('')).to.be.true;
    expect(isString('fdsa')).to.be.true;
    expect(isString(new String('test'))).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isString(new Date())).to.be.false;
    expect(isString(1409017499149)).to.be.false;
    expect(isString([])).to.be.false;
    expect(isString([true])).to.be.false;
    expect(isString([1, 2, 3])).to.be.false;
    expect(isString(new Array())).to.be.false;
    expect(isString(new Array(10))).to.be.false;
    expect(isString({ length: 1 })).to.be.false;
    expect(isString()).to.be.false;
    expect(isString(undefined)).to.be.false;
    expect(isString(function() {})).to.be.false;
    expect(isString(new Function())).to.be.false;
    expect(isString(1)).to.be.false;
    expect(isString(new Number(1))).to.be.false;
    expect(isString(null)).to.be.false;
    expect(isString(new Error())).to.be.false;
    expect(isString({ test: 'omg' })).to.be.false;
    expect(isString(new Object())).to.be.false;
    expect(isString(true)).to.be.false;
    expect(isString(false)).to.be.false;
    expect(isString(/a/)).to.be.false;
    expect(isString(new RegExp())).to.be.false;
    expect(isString(new RegExp('a'))).to.be.false;
    expect(isString(new Boolean())).to.be.false;
    expect(isString(new Boolean(true))).to.be.false;
    expect(isString(new Boolean(false))).to.be.false;
  });
});
