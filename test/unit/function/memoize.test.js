var memoize = fungus.memoize;
var identity = fungus.identity;

describe('memoize', function() {
  var memoAdd, memoIdentity;
  var add = chai.factory.create('functions').add;

  beforeEach(function() {
    add = sinon.spy(add);
    memoAdd = memoize(add);
    memoIdentity = memoize(identity);
  });

  it('should be a function', function() {
    expect(memoize).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(memoize.length).to.equal(1);
  });

  it('should return functions with an arity equal to that of the last argument', function() {
    expect(memoize(identity).length).to.equal(identity.length);
    expect(memoize(add).length).to.equal(add.length);
  });

  it('should only call the memoized function when arguments have not been seen before', function() {
    expect(add).to.have.not.been.called;

    memoAdd(3, 1);

    expect(add).to.have.been.calledOnce;

    memoAdd(3, 1);
    memoAdd(3, 1);

    expect(add).to.have.been.calledOnce;
  });

  it('should use the entire list of arguments in its serialization', function() {
    expect(add).to.have.not.been.called;

    memoAdd(3, 1);

    expect(add).to.have.been.calledOnce;

    memoAdd(3, 2);

    expect(add).to.have.been.calledTwice;
  });

  it('should work when passed weird aruments', function() {
    var obj = { a: 'a' };

    memoIdentity('test');
    memoIdentity(obj);
    memoIdentity(obj.__proto__);

    expect(memoIdentity(obj)).to.equal(obj);
    expect(memoIdentity('test')).to.equal('test');
    expect(memoIdentity(obj.__proto__)).to.equal(obj.__proto__);
  });

  it('should produce the same result as the original function', function() {
    expect(memoAdd(4, 2)).to.equal(add(4, 2));
    expect(memoAdd(4, 2, 3)).to.equal(add(4, 2, 3));
  });

  it('should memoize values for multiple different arguments lists', function() {
    expect(memoAdd(3, 1)).to.equal(4);
    expect(memoAdd(3, 1)).to.equal(4);
    expect(memoAdd(4, 2)).to.equal(6);
    expect(memoAdd(4, 2)).to.equal(6);
  });

  it('should work when given complex argument types (objects, arrays, etc)', function() {
    var extraArgs = [1, 2, 3];

    memoAdd(1, 2);

    expect(add).to.have.been.calledOnce;

    memoAdd(1, 2, extraArgs);
    memoAdd(1, 2, extraArgs);

    expect(add).to.have.been.calledTwice;
  });

  it('should recompute results when complex arguments\' properties are different than those seen before', function() {
    var extraArgs = [1, 2, 3];

    memoAdd(1, 2);

    expect(add).to.have.been.calledOnce;

    memoAdd(1, 2, extraArgs);
    memoAdd(1, 2, extraArgs);

    expect(add).to.have.been.calledTwice;

    extraArgs.push(3);
    memoAdd(1, 2, extraArgs);

    expect(add).to.have.been.calledThrice;
  });

  it('should accept a serializer function as its second argument', function() {
    var always1 = function() { return 1; };
    var uselessMemoAdd = memoize(add, always1);

    expect(uselessMemoAdd(1, 2)).to.equal(3);
    expect(uselessMemoAdd(2, 3)).to.equal(3);
    expect(uselessMemoAdd(3, 4)).to.equal(3);

    expect(add).to.have.been.calledOnce;
  });

  it('should throw an error when passed a non-function as its first argument', function() {
    expect(function() { memoize('test'); }).to.throw();
    expect(function() { memoize('test', identity); }).to.throw();
  });

  it('should throw an error when passed a non-function as its serializer argument', function() {
    expect(function() { memoize(identity, 'test'); }).to.throw();
  });

  it('should throw an error when passed no arguments', function() {
    expect(function() { memoize(); }).to.throw();
  });
});
