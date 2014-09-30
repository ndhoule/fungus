describe('gte', function() {
  var gte = fungus.gte;

  it('should be a function', function() {
    expect(gte).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(gte.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(gte).to.be.curried(1, 2, 'boolean');
  });

  it('should do what the native `>=` operator does', function() {
    expect(gte(2, 1)).to.equal(2 >= 1);
    expect(gte(2, 2)).to.equal(2 >= 2);
    expect(gte(-100, 4)).to.equal(-100 >= 4);
  });
});
