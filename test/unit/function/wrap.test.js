describe('wrap', function() {
  var wrap = fungus.wrap;

  var add, noop;

  beforeEach(function() {
    add = chai.factory.create('functions.add');
    noop = chai.factory.create('functions.noop');
  });

  it('should be a function', function() {
    expect(wrap).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(wrap.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(wrap).to.be.a('function');
    expect(wrap()()()()).to.be.a('function');
    expect(wrap(noop)).to.be.a('function');
    expect(wrap(noop, noop)).to.be.a('function');
  });

  it('should return a new function', function() {
    expect(wrap(noop, noop)).to.be.a('function');
  });

  it('should set the wrapper function\'s arity', function() {
    var expectsNone = function() {};
    var expectsFive = function(a, b, c, d, e) {};

    expect(wrap(expectsNone, expectsFive)).to.have.length(0);
    expect(wrap(expectsFive, expectsNone)).to.have.length(4);
  });

  it('should pass the value to the wrapper function, along with any arguments', function() {
    var fn = function() {};
    var wrapped = wrap(noop, fn);

    wrapped(1, 2, 3);

    expect(noop).to.have.been.calledWithExactly(fn, 1, 2, 3);
  });

  it('should throw an error when the `wrapper` argument is not a function', function() {
    expect(function() { wrap(1, 1); }).to.throw();
  });
});
