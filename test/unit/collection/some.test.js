describe('some', function() {
  var some = fungus.some;

  var identity;

  beforeEach(function() {
    identity = chai.factory.create('functions.identity');
  });

  it('should be a function', function() {
    expect(some).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(some.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(some).to.be.curried(identity, [1, 2, 3], 'boolean');
  });

  it('should return `true` when any element in the collection passes the `iterator` test', function() {
    expect(some(identity, [true])).to.be.true;
    expect(some(identity, [false, false, true])).to.be.true;
    expect(some(identity, [true, false, false])).to.be.true;
    expect(some(identity, [0, null, {}])).to.be.true;
    expect(some(identity, [{}, null, 0])).to.be.true;
  });

  it('should return `false` when no element in the collection passes the `iterator` test', function() {
    expect(some(identity, [NaN])).to.be.false;
    expect(some(identity, ['', 0, false])).to.be.false;
    expect(some(identity, [0, 0, 0])).to.be.false;
    expect(some(identity, [false, false, null])).to.be.false;
  });

  it('should pass the `iterator` three arguments: `value`, `index`, and `collection`', function() {
    some(identity, [0, null, false]);

    expect(identity).to.been.calledWith(0,     0, [0, null, false]);
    expect(identity).to.been.calledWith(null,  1, [0, null, false]);
    expect(identity).to.been.calledWith(false, 2, [0, null, false]);
  });

  it('should ignore non-indexed array values', function() {
    var arr = [0, null, 1];
    arr.enchanter = null;

    some(identity, arr);

    expect(identity).to.have.been.calledThrice;
    expect(some(identity, arr)).to.be.true;
  });

  it('should work on objects', function() {
    expect(some(identity, { a: false, b: '' })).to.be.false;
    expect(some(identity, { a: '', b: 'spam' })).to.be.true;
  });

  it('should ignore non-enumerable properties on objects', function() {
    var obj = Object.create(null, {
      a: { value: 1, enumerable: true },
      b: { value: 0, enumerable: false },
      c: { value: 2, enumerable: true },
    });

    expect(some(identity, obj)).to.be.true;
  });

  it('should ignore inherited properties on objects', function() {
    var parent = { a: 1 };
    var child = Object.create(parent);
    child.b = 0;

    expect(some(identity, child)).to.be.false;
  });

  it('should handle empty collections', function() {
    expect(some(identity, {})).to.be.false;
    expect(some(identity, [])).to.be.false;
  });

  it('should handle non-array/non-object values', function() {
    expect(some(identity, null)).to.be.false;
    expect(some(identity, 0)).to.be.false;
    expect(some(identity, '')).to.be.false;
    expect(some(identity, '000')).to.be.true;
    expect(some(identity, 'test')).to.be.true;
  });

  it('should throw an error when passed a non-function as its `fn` argument', function() {
    expect(function() { some('abc', [1, 2, 3]); }).to.throw(TypeError, 'Expected a function');
    expect(function() { some('abc', [1, 2, 3]); }).to.throw(TypeError, 'Expected a function');
  });
});
