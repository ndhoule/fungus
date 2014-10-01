describe('uniq', function() {
  var uniq = fungus.uniq;

  var arr, obj;

  beforeEach(function() {
    obj = {};
    arr = [];
  });

  it('should be a function', function() {
    expect(uniq).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(uniq.length).to.equal(1);
  });

  it('should return an array', function() {
    expect(uniq([1, 2, 3])).to.be.an('array');
  });

  it('should return an array free of duplicate values', function() {
    expect(uniq([1, 1, 22, 22, 333, 333])).to.have.members([1, 22, 333]);
    expect(uniq([true, true, false, false, NaN, NaN])).to.have.members([true, false, NaN]);
    expect(uniq([obj, arr, obj, arr, obj, arr])).to.have.members([obj, arr]);
  });

  it('should preserve insertion order', function() {
    expect(uniq([1, 2, 1, 3, 2, 3])).to.eql([1, 2, 3]);
    expect(uniq([1, 'z', 2, 3, 'a', 3])).to.eql([1, 'z', 2, 'a', 3]);
    expect(uniq([obj, 1, 'z', 2, 3, obj, 'a', 3, arr, arr])).to.eql([obj, 1, 'z', 2, 'a', 3, arr]);
  });

  it('should handle the empty set', function() {
    expect(uniq([])).to.be.an('array');
  });

  it('should not mutate its input', function() {
    var input = [3, 3, 1, 2, 1, 2, 3];
    var expected = input.slice();
    uniq(input);

    expect(input).to.eql(expected);
  });
});
