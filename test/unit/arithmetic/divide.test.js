describe('divide', function() {
  var divide = fungus.divide;

  it('should be a function', function() {
    expect(divide).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(divide.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(divide(1)).to.be.a('function');
    expect(divide(1)()()()).to.be.a('function');
    expect(divide(1)(2)).to.be.a('number');
    expect(divide(1)()()(2)).to.be.a('number');
  });

  it('should do what the native `/` operator does', function() {
    expect(divide(1, 2)).to.equal(1 / 2);
    expect(divide(10, 5)).to.equal(10 / 5);
    expect(divide(-10, 5)).to.equal(-10 / 5);
  });
});
