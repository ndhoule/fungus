var multiply = fnjs.multiply;

describe('multiply', function() {
  it('should be a function', function() {
    expect(multiply).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(multiply.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(multiply(1)).to.be.a('function');
    expect(multiply(1)()()()).to.be.a('function');
    expect(multiply(1)(2)).to.be.a('number');
    expect(multiply(1)()()(2)).to.be.a('number');
  });

  it('should do what the native `*` operator does', function() {
    expect(multiply(1, 2)).to.equal(1 * 2);
    expect(multiply(-1, 2)).to.equal(-1 * 2);
    expect(multiply(8, 9)).to.equal(8 * 9);
  });
});
