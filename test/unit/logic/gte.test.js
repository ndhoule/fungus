var gte = fnjs.gte;

describe('gte', function() {
  it('should be a function', function() {
    expect(gte).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(gte.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(gte(1)).to.be.a('function');
    expect(gte(1)()()()).to.be.a('function');
    expect(gte(1)(2)).to.be.a('boolean');
    expect(gte(1)()()(2)).to.be.a('boolean');
  });

  it('should do what the native `>=` operator does', function() {
    expect(gte(2, 1)).to.equal(2 >= 1);
    expect(gte(2, 2)).to.equal(2 >= 2);
    expect(gte(-100, 4)).to.equal(-100 >= 4);
  });
});
