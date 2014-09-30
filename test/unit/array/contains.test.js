describe('contains', function() {
  var contains = fungus.contains;

  it('should be a function', function() {
    expect(contains).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(contains).to.have.length(2);
  });

  it('should be curried', function() {
    expect(contains).to.be.curried(1, [], 'boolean');
  });

  it('should return `true` when a match is found', function() {
    expect(contains(1, [1, 1, 1])).to.be.true;
  });

  it('should return `false` when no match is found', function() {
    expect(contains(8, [1, 1, 1])).to.be.false;
  });

  it('should return the index for `NaN` values', function() {
    expect(contains(NaN, ['tim', 'the', 0, 'enchanter'])).to.be.false;
    expect(contains(NaN, ['tim', 'the', NaN, 'enchanter'])).to.be.true;
  });

  it('should distinguish between 0 and -0 values', function() {
    expect(contains(-0, ['tim', 'the', 0, 'enchanter'])).to.be.false;
    expect(contains(-0, ['tim', 'the', -0, 'enchanter'])).to.be.true;
  });

  it('should work on `arguments` objects', function() {
    var args = chai.factory.create('objects.arguments');

    expect(contains(5, args)).to.be.true;
  });

  it('should work on string primitives', function() {
    expect(contains('a', 'babc')).to.be.true;
    expect(contains('x', 'babc')).to.be.false;
  });

  it('should work on string objects', function() {
    expect(contains('a', new String('babc'))).to.be.true;
    expect(contains('x', new String('babc'))).to.be.false;
  });

  it('should work on objects', function() {
    expect(contains(1, { a: 1 })).to.be.true;
    expect(contains(1, { a: 2 })).to.be.false;
  });
});
