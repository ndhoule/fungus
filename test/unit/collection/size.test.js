describe('size', function() {
  var size = fungus.size;

  it('should be a function', function() {
    expect(size).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(size.length).to.equal(1);
  });

  it('should return an integer', function() {
    expect(size()).to.be.a('number');
    expect(size([1])).to.be.a('number');
    expect(size({})).to.be.a('number');
    expect(size('abcd')).to.be.a('number');
  });

  it('should return the `length` property, when `length` is defined and is numeric', function() {
    var customLength = chai.factory.create('objects.customLength');

    expect(customLength.length).to.be.a('number');
    expect(customLength.actualLength).to.be.a('number');
    expect(customLength.length).to.not.equal(customLength.actualLength);
    expect(size(customLength)).to.equal(customLength.length);
  });

  it('should work on arrays', function() {
    expect(size([])).to.equal(0);
    expect(size(['a', 'b', 'c'])).to.equal(3);
  });

  it('should work on objects', function() {
    expect(size({ a: true, b: false, c: null, d: 1 })).to.equal(4);
  });

  it('should ignore non-enumerable properties', function() {
    var nonenumerable = chai.factory.create('objects.nonenumerable');

    expect(size(nonenumerable)).to.equal(1);
  });

  it('should ignore inherited properties', function() {
    var child = chai.factory.create('objects.child');

    expect(size(child)).to.equal(1);
  });

  it('should work on arguments objects', function() {
    var args = chai.factory.create('objects.arguments');

    expect(size(args)).to.equal(5);
  });

  it('should work on string primitives', function() {
    expect(size('abcd')).to.equal(4);
  });

  it('should work on string objects', function() {
    expect(size(new String('abcd'))).to.equal(4);
  });

  it('should handle `undefined` and `null` values', function() {
    expect(size()).to.equal(0);
    expect(size(undefined)).to.equal(0);
    expect(size(null)).to.equal(0);
  });
});
