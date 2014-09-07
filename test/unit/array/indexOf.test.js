describe('indexOf', function() {
  var indexOf = fungus.indexOf;

  var args;

  beforeEach(function() {
    args = chai.factory.create('objects.arguments');
  });

  it('should be a function', function() {
    expect(indexOf).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(indexOf).to.have.length(2);
  });

  it('should be curried', function() {
    expect(indexOf('tim')).to.be.a('function');
    expect(indexOf('tim')()()()).to.be.a('function');
    expect(indexOf('tim')([])).to.be.a('number');
    expect(indexOf('tim')()()([])).to.be.a('number');
  });

  it('should return the index of the matching element', function() {
    var obj = {};

    expect(indexOf(1, [1, 2, 3])).to.equal(0);
    expect(indexOf(obj, [{}, obj, 5])).to.equal(1);
    expect(indexOf(null, [{}, null, 5])).to.equal(1);
  });

  it('should return the index for only the first match', function() {
    expect(indexOf(1, [1, 1, 1])).to.equal(0);
  });

  it('should return -1 when no match is found', function() {
    expect(indexOf(8, [1, 1, 1])).to.equal(-1);
  });

  it('should return the index for `NaN` values', function() {
    expect(indexOf(NaN, ['tim', 'the', 0, 'enchanter'])).to.equal(-1);
    expect(indexOf(NaN, ['tim', 'the', NaN, 'enchanter'])).to.equal(2);
  });

  it('should distinguish between 0 and -0 values', function() {
    expect(indexOf(-0, ['tim', 'the', 0, 'enchanter'])).to.equal(-1);
    expect(indexOf(-0, ['tim', 'the', -0, 'enchanter'])).to.equal(2);
  });

  it('should work on `arguments` objects', function() {
    expect(indexOf(4, args)).to.equal(3);
  });

  it('should work on strings', function() {
    expect(indexOf('a', 'babc')).to.equal(1);
  });

  it('should work on string objects', function() {
    expect(indexOf('a', new String('babc'))).to.equal(1);
  });
});
