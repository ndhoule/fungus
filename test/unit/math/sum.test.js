describe('sum', function() {
  var sum = fungus.sum;

  it('should be a function', function() {
    expect(sum).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(sum).to.have.length(1);
  });

  it('should return 0 for the empty sum', function() {
    expect(sum([])).to.equal(0);
  });

  it('should sum all the numbers in an array', function() {
    expect(sum([1])).to.equal(1);
    expect(sum([1, 2, 3])).to.equal(6);
    expect(sum([5, -10, -20])).to.equal(-25);
  });

  it('should handle objects', function() {
    expect(sum({ a: 5, b: 10, c: 15 })).to.equal(30);
  });
});
