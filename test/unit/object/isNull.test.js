var isNull = fungus.isNull;

describe('isNull', function() {
  it('should be a function', function() {
    expect(isNull).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isNull.length).to.equal(1);
  });

  it('should return `true` when passed `null`', function() {
    expect(isNull(null)).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isNull(new Date())).to.be.false;
    expect(isNull(new Date().toString())).to.be.false;
    expect(isNull(1409017499149)).to.be.false;
    expect(isNull([])).to.be.false;
    expect(isNull([true])).to.be.false;
    expect(isNull([1, 2, 3])).to.be.false;
    expect(isNull(new Array())).to.be.false;
    expect(isNull(new Array(10))).to.be.false;
    expect(isNull('')).to.be.false;
    expect(isNull('fdsa')).to.be.false;
    expect(isNull(new String('test'))).to.be.false;
    expect(isNull({ length: 1 })).to.be.false;
    expect(isNull()).to.be.false;
    expect(isNull(undefined)).to.be.false;
    expect(isNull(function() {})).to.be.false;
    expect(isNull(new Function())).to.be.false;
    expect(isNull(1)).to.be.false;
    expect(isNull(new Number(1))).to.be.false;
    expect(isNull(/a/)).to.be.false;
    expect(isNull(new RegExp('a'))).to.be.false;
    expect(isNull(new Error())).to.be.false;
    expect(isNull({ test: 'omg' })).to.be.false;
    expect(isNull(new Object())).to.be.false;
    expect(isNull(true)).to.be.false;
    expect(isNull(false)).to.be.false;
    expect(isNull(new Boolean())).to.be.false;
    expect(isNull(new Boolean(true))).to.be.false;
    expect(isNull(new Boolean(false))).to.be.false;
  });
});
