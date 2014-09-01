var modulo = fnjs.modulo;

describe('modulo', function() {
  it('should be a function', function() {
    expect(modulo).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(modulo.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(modulo(1)).to.be.a('function');
    expect(modulo(1)()()()).to.be.a('function');
    expect(modulo(1)(2)).to.be.a('number');
    expect(modulo(1)()()(2)).to.be.a('number');
  });

  it('should implement a modulo operation', function() {
    expect(modulo(10, 6)).to.equal(4);
    expect(modulo(-4, 3)).to.equal(2);
    expect(modulo(-10, 7)).to.equal(4);
  });
});
