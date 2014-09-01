var or = fnjs.or;

describe('or', function() {
  it('should be a function', function() {
    expect(or).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(or.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(or(1)).to.be.a('function');
    expect(or(1)()()()).to.be.a('function');
    expect(or(1)(2)).to.be.a('number');
    expect(or(1)()()(2)).to.be.a('number');
  });

  it('should do what the native `||` operator does', function() {
    var obj = {};
    var arr = [];

    expect(or(false, true)).to.equal(true);
    expect(or(0, 1)).to.equal(1);
    expect(or(obj, arr)).to.equal(obj);
    expect(or('omg', true)).to.equal('omg');
  });
});
