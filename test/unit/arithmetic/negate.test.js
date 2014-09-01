var negate = fungus.negate;

describe('negate', function() {
  it('should be a function', function() {
    expect(negate).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(negate.length).to.equal(1);
  });

  it('should do what the native `-` operator does when prefixed to an expression', function() {
    expect(negate(-1)).to.equal(-(-1));
    expect(negate(1)).to.equal(-1);
  });
});
