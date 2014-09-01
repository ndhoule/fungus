var foldl = fungus.foldl;
var identity = fungus.identity;

describe('foldl', function() {
  var observe, add;

  beforeEach(function() {
    observe = sinon.spy(identity);
    add = sinon.spy(chai.create('functions').add);
  });

  it('should be a function', function() {
    expect(foldl).to.be.a('function');
  });

  it('should have an arity of 3', function() {
    expect(foldl.length).to.equal(3);
  });

  it('should be curried', function() {
    var fn = foldl(observe);

    expect(fn).to.be.a('function');
    expect(fn()()()()).to.be.a('function');
    expect(fn([1, 2, 3])).to.be.a('function');
    expect(fn(4, [1, 2, 3])).to.be.a('number');
  });

  it('should pass the input function three arguments: value, index, and array', function() {
    foldl(add, 5, [100, 200, 300]);

    expect(add).to.been.calledWith(105, 200, 1, [100, 200, 300]);
    expect(add).to.been.calledWith(305, 300, 2, [100, 200, 300]);
  });

  it('should pass the accumulator to the first function call', function() {
    foldl(add, 5, [100, 200, 300]);

    expect(add).to.been.calledWith(5, 100, 0, [100, 200, 300]);
  });

  it('should accumulate a single return value', function() {
    expect(foldl(add, 5, [100, 200, 300])).to.equal(605);
  });

  it('should call the function with each array element, from right to left', function() {
    expect(foldl(add, 'z', ['a', 'b', 'c'])).to.equal('zabc');
  });

  it('should ignore non-indexed array values', function() {
    var arr = ['a'];
    arr.enchanter = 'Tim';

    foldl(add, 'z', arr);

    expect(add).to.have.been.calledOnce;
    expect(add).to.have.been.calledWith('z', 'a', 0, arr);
  });

  it('should work on objects', function() {
    var obj = { enchanter: 'Tim', meal: 'spam' };

    var result = foldl(function(acc, val) {
      return acc.concat(val);
    }, [], obj).sort();

    expect(result).to.eql(['Tim', 'spam']);
  });

  it('should ignore non-enumerable items', function() {
    var obj = Object.create(null, {
      enchanter: { value: 'Tim', enumerable: true },
      fear: { value: 'rabbit', enumerable: false },
      meal: { value: 'spam', enumerable: true }
    });

    var result = foldl(function(acc, val) {
      return acc.concat(val);
    }, [], obj).sort();

    expect(result).to.eql(['Tim', 'spam']);
  });

  // TODO: How to make this test useful? What should this behavior be?
  // TODO: Modify the documentation's `param` types when this is changed
  xit('should not make any guarantees on object iteration order other than those made by the host engine', function() {
  });

  it('should ignore inherited properties on objects', function() {
    var parent = { enchanter: 'Tim' };
    var child = Object.create(parent);
    child.food = 'spam';

    var result = foldl(function(acc, val) {
      return acc.concat(val);
    }, [], child);

    expect(result).to.eql(['spam']);
  });

  xit('should work on strings', function() {
  });

  it('should throw an error when passed a non-function as its `fn` argument', function() {
    expect(function() { foldl('fdsa', 1, []); }).to.throw();
    expect(function() { foldl('fdsa', 1, [1]); }).to.throw();
  });
});
