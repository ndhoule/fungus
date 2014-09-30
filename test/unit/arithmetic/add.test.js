describe('add', function() {
  var add = fungus.add;

  it('should be a function', function() {
    expect(add).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(add.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(add).to.be.curried(1, 2, 'number');
  });

  it('should do what the native `+` operator does', function() {
    expect(add(1, 2)).to.equal(1 + 2);
    expect(add(-1, 2)).to.equal(-1 + 2);
  });
});
