describe('foldr', function() {
  var foldr = fungus.foldr;

  var identity, add;

  beforeEach(function() {
    add = chai.factory.create('functions.add');
    identity = chai.factory.create('functions.identity');
  });

  it('should be a function', function() {
    expect(foldr).to.be.a('function');
  });

  it('should have an arity of 3', function() {
    expect(foldr.length).to.equal(3);
  });

  it('should be curried', function() {
    expect(foldr).to.be.curried(identity, 4, [1, 2, 3], 'number');
  });

  it('should accumulate a single return value', function() {
    expect(foldr(add, 5, [100, 200, 300])).to.equal(605);
  });

  it('should pass the accumulator to the first function call', function() {
    foldr(add, 5, [100, 200, 300]);

    expect(add).to.been.calledWith(5, 300, 2, [100, 200, 300]);
  });

  it('should pass the input function three arguments: value, index, and array', function() {
    foldr(add, 5, [100, 200, 300]);

    expect(add).to.been.calledWith(305, 200, 1, [100, 200, 300]);
    expect(add).to.been.calledWith(505, 100, 0, [100, 200, 300]);
  });

  it('should call the function with each array element, from right to left', function() {
    expect(foldr(add, 'z', ['a', 'b', 'c'])).to.equal('zcba');
  });

  it('should ignore non-indexed array values', function() {
    var arr = ['a'];
    arr.enchanter = 'Tim';

    foldr(add, 'z', arr);

    expect(add).to.have.been.calledOnce;
    expect(add).to.have.been.calledWith('z', 'a', 0, arr);
  });

  // TODO: test iteration order on objects

  it('should work on objects', function() {
    var obj = { enchanter: 'Tim', meal: 'spam' };

    var result = foldr(function(acc, val) {
      return acc.concat(val);
    }, [], obj).sort();

    expect(result).to.eql(['Tim', 'spam']);
  });

  it('should ignore non-enumerable properties on objects', function() {
    var obj = Object.create(null, {
      enchanter: { value: 'Tim', enumerable: true },
      fear: { value: 'rabbit', enumerable: false },
      meal: { value: 'spam', enumerable: true }
    });

    var result = foldr(function(acc, val) {
      return acc.concat(val);
    }, [], obj).sort();

    expect(result).to.eql(['Tim', 'spam']);
  });

  it('should ignore inherited properties on objects', function() {
    var parent = { enchanter: 'Tim' };
    var child = Object.create(parent);
    child.food = 'spam';

    var result = foldr(function(acc, val) {
      return acc.concat(val);
    }, [], child);

    expect(result).to.eql(['spam']);
  });

  it('should work on string primitives', function() {
    expect(foldr(add, 'z', 'abc')).to.equal('zcba');
  });

  it('should work on string objects', function() {
    expect(foldr(add, new String('z'), new String('abc'))).to.equal('zcba');
  });

  it('should throw an error when passed a non-function as its `iterator` argument', function() {
    expect(function() { foldr('fdsa', 1, []); }).to.throw();
    expect(function() { foldr('fdsa', 1, [1]); }).to.throw();
  });
});
