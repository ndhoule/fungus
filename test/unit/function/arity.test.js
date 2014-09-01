var arity = fnjs.arity;

describe('arity', function() {
  var add;

  beforeEach(function() {
    add = sinon.spy(chai.create('functions').add);
  });

  it('should be a function', function() {
    expect(arity).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(arity.length).to.equal(2);
  });

  it('should return a new function', function() {
    expect(arity(2, add)).to.be.a('function');
  });

  it('should set the returned function\'s arity', function() {
    expect(arity(3, add).length).to.equal(3);
  });

  it('should handle large (uncached) arities', function() {
    expect(arity(100, add).length).to.equal(100);
  });

  it('should gracefully handle negative arities', function() {
    expect(arity(-1, add).length).to.equal(0);
  });

  it('should gracefully handle non-numeric arities', function() {
    expect(arity('omg', add).length).to.equal(0);
  });

  it('should throw an error when passed a non-function', function() {
    expect(function() { arity(2, 'omg'); }).to.throw();
  });

  it('should pass all arguments to the wrapped function, regardless of specified arity', function() {
    var aritiedAdd = arity(1, add);

    expect(aritiedAdd.length).to.equal(1);
    expect(aritiedAdd(1, 2)).to.equal(3);
    expect(add).to.have.been.calledWith(1, 2);
  });
});
