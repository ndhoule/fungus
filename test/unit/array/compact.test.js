describe('compact', function() {
  var compact = fungus.compact;

  var fn, obj, arr, falses, truths, mixed;

  beforeEach(function() {
    fn = function() {};
    obj = {};
    arr = [];

    falses = [undefined, null, false, '', 0, NaN];
    truths = ['a', 1, -1, obj, fn, arr];
    mixed = [1, '', 'spam', NaN, obj, 0, fn, arr];
  });

  it('should be a function', function() {
    expect(compact).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(compact.length).to.equal(1);
  });

  it('should be curried', function() {
    expect(compact).to.be.curried([], 'array');
  });

  it('should return an array', function() {
    expect(compact([1, 2, 3])).to.be.an('array');
  });

  it('should handle the empty set', function() {
    expect(compact([])).to.be.an('array');
  });

  it('should not mutate its input', function() {
    compact(mixed);

    expect(mixed).to.eql([1, '', 'spam', NaN, obj, 0, fn, arr]);
  });

  it('should return a list excluding all falsy values', function() {
    expect(compact(falses)).to.eql([]);
    expect(compact(truths)).to.eql(truths);
    expect(compact(mixed)).to.eql([1, 'spam', obj, fn, arr]);
  });
});
