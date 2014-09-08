describe('eq', function() {
  var eq = fungus.eq;

  it('should be a function', function() {
    expect(eq).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(eq.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(eq(1)).to.be.a('function');
    expect(eq(1)()()()).to.be.a('function');
    expect(eq(1)(2)).to.be.a('boolean');
    expect(eq(1)()()(2)).to.be.a('boolean');
  });

  it('should do what the native `===` operator does', function() {
    var obj = {};
    expect(eq(1, 1)).to.equal(1 === 1);
    expect(eq(2, 1)).to.equal(2 === 1);
    expect(eq(1, 2)).to.equal(1 === 2);
    expect(eq(obj, obj)).to.equal(obj === obj);
  });
});
