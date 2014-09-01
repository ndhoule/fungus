var isObject = fnjs.isObject;

describe('isObject', function() {
  it('should be a function', function() {
    expect(isObject).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isObject.length).to.equal(1);
  });

  it('should return `true` when passed an object', function() {
    expect(isObject(/a/)).to.be.true;
    expect(isObject([])).to.be.true;
    expect(isObject([1, 2, 3])).to.be.true;
    expect(isObject({ length: 1 })).to.be.true;
    expect(isObject(new Array())).to.be.true;
    expect(isObject(new Array(10))).to.be.true;
    expect(isObject(new String('test'))).to.be.true;
    expect(isObject(new Number(1))).to.be.true;
    expect(isObject(new Boolean(true))).to.be.true;
    expect(isObject(new RegExp('a'))).to.be.true;
    expect(isObject(new Date())).to.be.true;
    expect(isObject(new Error())).to.be.true;
    expect(isObject(new Object())).to.be.true;
  });

  it('should return `false` when passed a non-object', function() {
    expect(isObject()).to.be.false;
    expect(isObject(undefined)).to.be.false;
    expect(isObject(null)).to.be.false;
    expect(isObject('')).to.be.false;
    expect(isObject('fdsa')).to.be.false;
    expect(isObject(function() {})).to.be.false;
    expect(isObject(new Function())).to.be.false;
    expect(isObject(1)).to.be.false;
    expect(isObject(true)).to.be.false;
    expect(isObject(false)).to.be.false;
  });
});
