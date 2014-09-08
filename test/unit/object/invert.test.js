describe('invert', function() {
  var invert = fungus.invert;

  it('should be a function', function() {
    expect(invert).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(invert.length).to.equal(1);
  });

  it('should return a new object', function() {
    var obj = { a: 'a' };

    expect(invert(obj)).to.not.equal(obj);
  });

  it('should work on an object with a `.length` property', function() {
    var obj = { a: 1, b: 2, length: 100 };
    var expected = { '1': 'a', '2': 'b', '100': 'length' };

    expect(invert(obj)).to.eql(expected);
  });

  it('should reverse the key and value of properties', function() {
    var obj = { a: 1, b: 2 };
    var expected = { '1': 'a', '2': 'b' };

    expect(invert(obj)).to.eql(expected);
  });

  it('should ignore non-enumerable properties', function() {
    var obj = { a: 1, b: 2 };
    Object.defineProperty(obj, 'hidden', { value: 'hidden', enumerable: false });

    expect(invert(obj)).to.not.have.property('hidden');
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: 'parent' };
    var child = Object.create(parent);
    child.child = 'child';

    expect(invert(child)).to.not.have.property('parent');
  });
});
