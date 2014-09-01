var isArguments = fnjs.isArguments;

describe('isArguments', function() {
  it('should be a function', function() {
    expect(isArguments).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isArguments.length).to.equal(1);
  });

  it('should return `true` when passed an arguments object', function() {
    (function() { expect(isArguments(arguments)).to.be.true; })();
    (function() { expect(isArguments(arguments)).to.be.true; })(2, 3, 4);

    var args;
    (function() { args = arguments; })(2, 3, 4);
    expect(isArguments(args)).to.be.true
  });

  it('should return `false` when passed a non-arguments object', function() {
    expect(isArguments({ length: 1 })).to.be.false;
    expect(isArguments([])).to.be.false;
    expect(isArguments([1, 2, 3])).to.be.false;
    expect(isArguments(new Array())).to.be.false;
    expect(isArguments(new Array(10))).to.be.false;
    expect(isArguments('')).to.be.false;
    expect(isArguments('fdsa')).to.be.false;
    expect(isArguments(new String('test'))).to.be.false;
    expect(isArguments({ length: 1 })).to.be.false;
    expect(isArguments()).to.be.false;
    expect(isArguments(undefined)).to.be.false;
    expect(isArguments(null)).to.be.false;
    expect(isArguments(function() {})).to.be.false;
    expect(isArguments(new Function())).to.be.false;
    expect(isArguments(1)).to.be.false;
    expect(isArguments(new Number(1))).to.be.false;
    expect(isArguments(true)).to.be.false;
    expect(isArguments(false)).to.be.false;
    expect(isArguments(new Boolean(true))).to.be.false;
    expect(isArguments(/a/)).to.be.false;
    expect(isArguments(new RegExp('a'))).to.be.false;
    expect(isArguments(new Date())).to.be.false;
    expect(isArguments(new Error())).to.be.false;
    expect(isArguments({ test: 'omg' })).to.be.false;
    expect(isArguments(new Object())).to.be.false;
  });
});
