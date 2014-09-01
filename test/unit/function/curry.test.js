var curry = fnjs.curry;

describe('curry', function() {
  var add, curriedAdd, reduce, curriedReduce;
  var functions = chai.create('functions');

  beforeEach(function() {
    add = sinon.spy(functions.add);
    curriedAdd = sinon.spy(curry(add));
    reduce = sinon.spy(functions.reduce);
    curriedReduce = sinon.spy(curry(reduce));
  });

  it('should be a function', function() {
    expect(curry).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(curry.length).to.equal(2);
  });

  it('should return a new function', function() {
    expect(curriedAdd).to.be.a('function');
    expect(curriedAdd).to.not.equal(add);
    expect(curriedAdd).to.not.equal(curry);
  });

  it('should set the returned function\'s arity', function() {
    expect(add.length).to.equal(2);
    expect(curriedAdd.length).to.equal(2);
    expect(curriedAdd(1).length).to.equal(1);
  });

  it('should set the returned function\'s arity after repeated calls', function() {
    var sum = curriedReduce();

    expect(sum.length).to.equal(3);
    sum = curriedReduce(add);
    expect(sum.length).to.equal(2);
    sum = sum(0);
    expect(sum.length).to.equal(1);
    sum = sum();
    sum = sum();
    sum = sum();
    expect(sum.length).to.equal(1);
  });

  it('should allow the user to call the curried function repeatedly without parameters', function() {
    expect(function() {
      curriedAdd();
      curriedAdd();
      curriedAdd();
    }).to.not.throw();
  });

  it('should allow the user to call the curried function repeatedly without parameters without changing its arity', function() {
    expect(curriedAdd.length).to.equal(2);
    curriedAdd();
    curriedAdd();
    curriedAdd();
    expect(curriedAdd.length).to.equal(2);
  });

  it('should repeatedly return a new function until passed its expected number of arguments', function() {
    var originalCurriedAdd = curriedAdd;

    expect(curriedAdd()).to.not.equal(curriedAdd);
    expect(curriedAdd()).to.be.a('function');
    curriedAdd = curriedAdd();
    curriedAdd = curriedAdd();
    curriedAdd = curriedAdd();
    expect(curriedAdd).to.not.equal(originalCurriedAdd);
    expect(curriedAdd).to.be.a('function');
  });

  it('should invoke the function once the expected number of arguments is provided', function() {
    var addOne = curriedAdd(1);

    expect(addOne).to.be.a('function');
    expect(addOne(3)).to.equal(4);
  });

  it('should allow the user to pass a specific arity for a function', function() {
    expect(curry(add, 1).length).to.equal(1);
  });

  it('should pass excess arguments through to the wrapped function, regardless of arity', function() {
    expect(curriedAdd.length).to.equal(2);
    curriedAdd(1, 2, 3, 4, 5);
    expect(add).to.have.been.calledWith(1, 2, 3, 4, 5);
  });

  it('should curry functions of arity 0 gracefully', function() {
    var spy = sinon.spy();
    var curriedSpy = curry(spy);
    expect(spy.length).to.equal(0);
    expect(curriedSpy.length).to.equal(0);

    curriedSpy();
    expect(spy).to.have.been.calledOnce;
    curriedSpy();
    expect(spy).to.have.been.calledTwice;
  });

  it('should handle an arity argument of 0 gracefully', function() {
    expect(curry(add, 0).length).to.equal(0);
  });

  it('should handle negative arities gracefully', function() {
    expect(curry(add, -100).length).to.equal(0);
  });

  it('should handle a non-integer arity argument gracefully', function() {
    expect(add.length).to.equal(2);
    expect(curry(add, 'a').length).to.equal(2);
  });

  it('should throw an error when passed a non-function as its function argument', function() {
    expect(function() { curry('omg'); }).to.throw();
  });
});
