var gt = fnjs.gt;

describe('gt', function() {
  it('should be a function', function() {
    expect(gt).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(gt.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(gt(1)).to.be.a('function');
    expect(gt(1)()()()).to.be.a('function');
    expect(gt(1)(2)).to.be.a('boolean');
    expect(gt(1)()()(2)).to.be.a('boolean');
  });

  it('should do what the native `>` operator does', function() {
    expect(gt(-100, 4)).to.equal(-100 > 4);
    expect(gt(2, 1)).to.equal(2 > 1);
  });
});
