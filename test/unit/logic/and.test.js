var and = fungus.and;

describe('and', function() {
  it('should be a function', function() {
    expect(and).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(and.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(and(1)).to.be.a('function');
    expect(and(1)()()()).to.be.a('function');
    expect(and(1)(2)).to.be.a('number');
    expect(and(1)()()(2)).to.be.a('number');
  });

  it('should do what the native `&&` operator does', function() {
    var obj = {};
    var arr = [];

    expect(and(false, true)).to.equal(false);
    expect(and(0, 1)).to.equal(0);
    expect(and(obj, arr)).to.equal(arr);
    expect(and('omg', true)).to.equal(true);
  });
});
