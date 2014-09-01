var noop = fungus.noop;

describe('noop', function() {
  it('should be a function', function() {
    expect(noop).to.be.a('function');
  });

  it('should have an arity of 0', function() {
    expect(noop.length).to.equal(0);
  });

  it('should return `undefined` when invoked, regardless of arguments', function() {
    expect(noop()).to.be.undefined;
    expect(noop('omg')).to.be.undefined;
    expect(noop(1, 2, 3)).to.be.undefined;
  });
});
