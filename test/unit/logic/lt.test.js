describe('lt', function() {
  var lt = fungus.lt;

  it('should be a function', function() {
    expect(lt).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(lt.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(lt).to.be.curried(1, 2, 'boolean');
  });

  it('should do what the native `<` operator does', function() {
    expect(lt(2, 1)).to.equal(2 < 1);
    expect(lt(-100, 4)).to.equal(-100 < 4);
  });
});
