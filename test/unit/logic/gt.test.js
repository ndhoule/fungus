describe('gt', function() {
  var gt = fungus.gt;

  it('should be a function', function() {
    expect(gt).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(gt.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(gt).to.be.curried(1, 2, 'boolean');
  });

  it('should do what the native `>` operator does', function() {
    expect(gt(-100, 4)).to.equal(-100 > 4);
    expect(gt(2, 1)).to.equal(2 > 1);
  });
});
