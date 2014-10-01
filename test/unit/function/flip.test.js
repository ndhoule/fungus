describe('flip', function() {
  var flip = fungus.flip;

  var add;

  beforeEach(function() {
    add = chai.factory.create('functions.add');
  });

  it('should be a function', function() {
    expect(flip).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(flip.length).to.equal(1);
  });

  it('should return a new function', function() {
    expect(flip(add)).to.be.a('function');
  });

  it('should reverse the order of the first two arguments to the wrapped function', function() {
    flip(add)(1, 2);

    expect(add).to.have.been.calledWithExactly(2, 1);
  });

  it('should not alter the order of subsequent arguments after the first two arguments', function() {
    flip(add)(1, 2, 5, 6, 7);

    expect(add).to.have.been.calledWithExactly(2, 1, 5, 6, 7);
  });

  it('should set the returned function\'s arity', function() {
    expect(flip(add).length).to.equal(add.length);
  });

  it('should throw an error when passed a non-function', function() {
    expect(function() { flip('omg'); }).to.throw();
  });
});
