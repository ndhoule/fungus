describe('isFunction', function() {
  var isFunction = fungus.isFunction;

  it('should be a function', function() {
    expect(isFunction).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isFunction.length).to.equal(1);
  });

  it('should return `true` when passed a function', function() {
    expect(isFunction(function() {})).to.be.true;
    expect(isFunction(Boolean)).to.be.true;
    expect(isFunction(Number)).to.be.true;
    expect(isFunction(Object)).to.be.true;
    expect(isFunction(new Function())).to.be.true;
  });

  it('should return `false` when passed a non-function', function() {
    expect(isFunction()).to.be.false;
    expect(isFunction(undefined)).to.be.false;
    expect(isFunction(null)).to.be.false;
    expect(isFunction('')).to.be.false;
    expect(isFunction('fdsa')).to.be.false;
    expect(isFunction(new String('test'))).to.be.false;
    expect(isFunction(1)).to.be.false;
    expect(isFunction(new Number(1))).to.be.false;
    expect(isFunction(true)).to.be.false;
    expect(isFunction(false)).to.be.false;
    expect(isFunction(new Boolean(true))).to.be.false;
    expect(isFunction(/a/)).to.be.false;
    expect(isFunction(new RegExp('a'))).to.be.false;
    expect(isFunction(new Date())).to.be.false;
    expect(isFunction(new Error())).to.be.false;
    expect(isFunction({ test: 'omg' })).to.be.false;
    expect(isFunction(new Object())).to.be.false;
    expect(isFunction([])).to.be.false;
    expect(isFunction([1, 2, 3])).to.be.false;
  });
});
