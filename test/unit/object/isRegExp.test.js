var isRegExp = fungus.isRegExp;

describe('isRegExp', function() {
  it('should be a function', function() {
    expect(isRegExp).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isRegExp.length).to.equal(1);
  });

  it('should return `true` when passed a regular expression', function() {
    expect(isRegExp(/a/)).to.be.true;
    expect(isRegExp(new RegExp())).to.be.true;
    expect(isRegExp(new RegExp('a'))).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isRegExp(new Date())).to.be.false;
    expect(isRegExp(new Date().toString())).to.be.false;
    expect(isRegExp(1409017499149)).to.be.false;
    expect(isRegExp([])).to.be.false;
    expect(isRegExp([true])).to.be.false;
    expect(isRegExp([1, 2, 3])).to.be.false;
    expect(isRegExp(new Array())).to.be.false;
    expect(isRegExp(new Array(10))).to.be.false;
    expect(isRegExp('')).to.be.false;
    expect(isRegExp('fdsa')).to.be.false;
    expect(isRegExp(new String('test'))).to.be.false;
    expect(isRegExp({ length: 1 })).to.be.false;
    expect(isRegExp()).to.be.false;
    expect(isRegExp(undefined)).to.be.false;
    expect(isRegExp(function() {})).to.be.false;
    expect(isRegExp(new Function())).to.be.false;
    expect(isRegExp(1)).to.be.false;
    expect(isRegExp(new Number(1))).to.be.false;
    expect(isRegExp(null)).to.be.false;
    expect(isRegExp(new Error())).to.be.false;
    expect(isRegExp({ test: 'omg' })).to.be.false;
    expect(isRegExp(new Object())).to.be.false;
    expect(isRegExp(true)).to.be.false;
    expect(isRegExp(false)).to.be.false;
    expect(isRegExp(new Boolean())).to.be.false;
    expect(isRegExp(new Boolean(true))).to.be.false;
    expect(isRegExp(new Boolean(false))).to.be.false;
  });
});
