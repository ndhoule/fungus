describe('last', function() {
  var last = fungus.last;

  it('should be a function', function() {
    expect(last).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(last.length).to.equal(1);
  });

  it('should return the last element from an array', function() {
    expect(last(['a', 'b', 'c'])).to.equal('c');
  });

  it('should should tolerate empty arrays', function() {
    expect(last([])).to.be.undefined;
  });

  it('should not mutate its input array', function() {
    var obj1 = {};
    var obj2 = {};
    var arr = [obj1, obj2];

    last(arr);

    expect(arr).to.eql([obj1, obj2]);
  });

  it('should work on `arguments` objects', function() {
    var args = chai.factory.create('objects.arguments');
    expect(last(args)).to.equal(5);
  });

  it('should return the last element from string primitives', function() {
    expect(last('fdsa')).to.equal('a');
  });

  it('should return the last element from string objects', function() {
    expect(last(new String('fdsa'))).to.equal('a');
  });

  it('should tolerate empty strings', function() {
    expect(last('')).to.be.undefined;
    expect(last(new String(''))).to.be.undefined;
  });

  it('should should tolerate non-array arguments', function() {
    expect(last()).to.be.undefined;
    expect(last(1)).to.be.undefined;
    expect(last(true)).to.be.undefined;
    expect(last(false)).to.be.undefined;
    expect(last(null)).to.be.undefined;
    expect(last(undefined)).to.be.undefined;
  });
});
