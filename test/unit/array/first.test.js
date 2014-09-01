var first = fungus.first;

describe('first', function() {
  it('should be a function', function() {
    expect(first).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(first.length).to.equal(1);
  });

  it('should return the first element from an array', function() {
    expect(first(['a', 'b', 'c'])).to.equal('a');
  });

  it('should not mutate its input array', function() {
    var obj1 = {};
    var obj2 = {};
    var arr = [obj1, obj2];

    first(arr);

    expect(arr).to.eql([obj1, obj2]);
  });

  it('should should tolerate empty arrays', function() {
    expect(first([])).to.be.undefined;
  });

  it('should return the first element from strings', function() {
    expect(first('fdsa')).to.equal('f');
  });

  it('should work on `arguments` objects', function() {
    var obj1 = {};

    (function() {
      expect(first(arguments)).to.equal(obj1);
    }(obj1));
  });

  it('should should tolerate non-array arguments', function() {
    expect(first()).to.be.undefined;
    expect(first(1)).to.be.undefined;
    expect(first(true)).to.be.undefined;
    expect(first(false)).to.be.undefined;
    expect(first(null)).to.be.undefined;
    expect(first(undefined)).to.be.undefined;
  });
});
