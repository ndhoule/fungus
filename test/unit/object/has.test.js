var has = fungus.has;

describe('has', function() {
  it('should be a function', function() {
    expect(has).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(has.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(has('test')).to.be.a('function');
    expect(has('test')()()()).to.be.a('function');
    expect(has('test')({})).to.be.a('boolean');
    expect(has('test')()()({})).to.be.a('boolean');
  });

  it('should return `true` when an object has a specified property', function() {
    expect(has('test', { test: 1 })).to.be.true;
  });

  it('should return `false` when an object does not have a specified property', function() {
    expect(has('test', {})).to.be.false;
    expect(has('test', { testz: 1 })).to.be.false;
  });

  it('should ignore inherited properties', function() {
    var parent = { a: 'a' };
    var child = Object.create(parent);

    expect(has('a', child)).to.be.false;
  });

  it('should return `false` when passed `null` and `undefined` as target object', function() {
    expect(has('test', null)).to.be.false;
    expect(has('test', undefined)).to.be.false;
  });
});
