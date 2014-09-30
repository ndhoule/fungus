describe('range', function() {
  var range = fungus.range;

  it('should be a function', function() {
    expect(range).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(range.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(range).to.be.curried(1, 2, 'array');
  });

  it('should return an array', function() {
    expect(range(0, 0)).to.be.an('array');
    expect(range(1, 100)).to.be.an('array');
    expect(range(100, -100)).to.be.an('array');
  });

  it('should produce a range of numbers, where `start` is inclusive and `end` is exclusive', function() {
    expect(range(0, 0)).to.deep.equal([]);
    expect(range(1, 2)).to.deep.equal([1]);
    expect(range(1, 10)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should handle non-numeric `start` and `end` values', function() {
    expect(range('x', {})).to.deep.equal([]);
  });

  it('should handle a `start` that is greater than `end`', function() {
    expect(range(0, -1)).to.deep.equal([]);
    expect(range(10, -10)).to.deep.equal([]);
  });
});
