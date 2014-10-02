describe('pipe', function() {
  var pipe = fungus.pipe;

  var add, identity;

  beforeEach(function() {
    add = chai.factory.create('functions.add');
    identity = chai.factory.create('functions.identity');
  });

  it('should be a function', function() {
    expect(pipe).to.be.a('function');
  });

  it('should have an arity of 0', function() {
    expect(pipe.length).to.equal(0);
  });

  it('should return functions with an arity equal to that of the first argument', function() {
    var a = function(a, b) {};
    var b = function(a, b, c) {};
    var fn = pipe(a, b);

    expect(fn.length).to.equal(a.length);
  });

  it('should return the original function when passed only one argument', function() {
    expect(pipe(add)).to.equal(add);
  });

  it('should call functions in left-associative order', function() {
    var first = sinon.spy();
    var second = sinon.spy();
    var third = sinon.spy();

    pipe(first, second, third)();

    expect(first).to.have.been.calledBefore(second);
    expect(second).to.have.been.calledBefore(third);
  });

  it('should only call each function once', function() {
    var first = sinon.spy();
    var second = sinon.spy();
    var third = sinon.spy();

    pipe(third, second, first)();

    expect(first).to.have.been.calledOnce;
    expect(second).to.have.been.calledOnce;
    expect(third).to.have.been.calledOnce;
  });

  it('should pass the results of the previous function call to the next', function() {
    var addOne = function(a) {
      return add(a, 1);
    };
    var first = sinon.spy(addOne);
    var second = sinon.spy(addOne);
    var third = sinon.spy(addOne);

    pipe(first, second, third)(0);

    expect(first).to.have.been.calledWith(0);
    expect(second).to.have.been.calledWith(1);
    expect(third).to.have.been.calledWith(2);
  });

  it('should throw an error if any of its arguments are non-functions', function() {
    expect(function() { pipe('abc'); }).to.throw();
    expect(function() { pipe(true, identity, identity); }).to.throw();
    expect(function() { pipe(identity, 1, identity); }).to.throw();
    expect(function() { pipe(identity, identity, 'fdsa'); }).to.throw();
  });
});
