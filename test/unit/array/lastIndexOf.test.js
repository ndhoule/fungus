describe('lastIndexOf', function() {
  var lastIndexOf = fungus.lastIndexOf;

  var args;

  beforeEach(function() {
    args = chai.factory.create('objects.arguments');
  });

  it('should be a function', function() {
    expect(lastIndexOf).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(lastIndexOf).to.have.length(2);
  });

  it('should be curried', function() {
    expect(lastIndexOf('tim')).to.be.a('function');
    expect(lastIndexOf('tim')()()()).to.be.a('function');
    expect(lastIndexOf('tim')([])).to.be.a('number');
    expect(lastIndexOf('tim')()()([])).to.be.a('number');
  });

  it('should return the index of the last matching element', function() {
    var obj = {};

    expect(lastIndexOf(1, [1, 2, 3])).to.equal(0);
    expect(lastIndexOf(obj, [{}, obj, obj])).to.equal(2);
    expect(lastIndexOf(null, [null, {}, null])).to.equal(2);
  });

  it('should return the index for only the last match', function() {
    expect(lastIndexOf(1, [1, 1, 1])).to.equal(2);
  });

  it('should return -1 when no match is found', function() {
    expect(lastIndexOf(8, [1, 1, 1])).to.equal(-1);
  });

  it('should return the index for `NaN` values', function() {
    expect(lastIndexOf(NaN, ['tim', 'the', 0, 'enchanter'])).to.equal(-1);
    expect(lastIndexOf(NaN, ['tim', 'the', NaN, 'enchanter'])).to.equal(2);
  });

  it('should distinguish between 0 and -0 values', function() {
    expect(lastIndexOf(-0, ['tim', 'the', 0, 'enchanter'])).to.equal(-1);
    expect(lastIndexOf(-0, ['tim', 'the', -0, 'enchanter'])).to.equal(2);
  });

  it('should work on `arguments` objects', function() {
    expect(lastIndexOf(4, args)).to.equal(3);
  });

  it('should work on strings', function() {
    expect(lastIndexOf('a', 'babc')).to.equal(1);
  });

  it('should work on string objects', function() {
    expect(lastIndexOf('a', new String('babc'))).to.equal(1);
  });
});
