var compose = fungus.compose;
var identity = fungus.identity;

describe('compose', function() {
  var add;

  beforeEach(function() {
    add = sinon.spy(chai.factory.create('functions').add);
  });

  it('should be a function', function() {
    expect(compose).to.be.a('function');
  });

  it('should have an arity of 0', function() {
    expect(compose.length).to.equal(0);
  });

  it('should return functions with an arity equal to that of the last argument', function() {
    var fn = compose(add, add);

    expect(fn.length).to.equal(add.length);
  });

  it('should return the original function when passed only one argument', function() {
    expect(compose(add)).to.equal(add);
  });

  it('should call functions in right-associative order', function() {
    var first = sinon.spy();
    var second = sinon.spy();
    var third = sinon.spy();

    compose(third, second, first)();

    expect(first).to.have.been.calledBefore(second);
    expect(second).to.have.been.calledBefore(third);
  });

  it('should only call each function once', function() {
    var first = sinon.spy();
    var second = sinon.spy();
    var third = sinon.spy();

    compose(third, second, first)();

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

    compose(third, second, first)(0);

    expect(first).to.have.been.calledWith(0);
    expect(second).to.have.been.calledWith(1);
    expect(third).to.have.been.calledWith(2);
  });

  it('should throw an error if any of its arguments are non-functions', function() {
    expect(function() { compose('abc'); }).to.throw();
    expect(function() { compose(true, identity, identity); }).to.throw();
    expect(function() { compose(identity, 1, identity); }).to.throw();
    expect(function() { compose(identity, identity, 'fdsa'); }).to.throw();
  });
});
