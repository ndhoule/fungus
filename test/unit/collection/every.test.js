describe('every', function() {
  var every = fungus.every;

  var identity;

  beforeEach(function() {
    identity = chai.factory.create('functions.identity');
  });

  it('should be a function', function() {
    expect(every).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(every.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(every).to.be.curried(identity, [1, 2, 3], 'boolean');
  });

  it('should return `true` when all elements in the collection pass the `iterator` test', function() {
    expect(every(identity, [true])).to.be.true;
    expect(every(identity, [true, true, true])).to.be.true;
    expect(every(identity, ['a', 1, {}])).to.be.true;
  });

  it('should return `false` when any element in the collection fails the `iterator` test', function() {
    expect(every(identity, [NaN])).to.be.false;
    expect(every(identity, ['', 1, 2])).to.be.false;
    expect(every(identity, [0, 1, 2])).to.be.false;
    expect(every(identity, [2, 1, 0])).to.be.false;
    expect(every(identity, [true, false, true])).to.be.false;
    expect(every(identity, [null, true, true])).to.be.false;
  });

  it('should pass the `iterator` three arguments: `value`, `index`, and `collection`', function() {
    every(identity, [100, 200, 300]);

    expect(identity).to.been.calledWith(100, 0, [100, 200, 300]);
    expect(identity).to.been.calledWith(200, 1, [100, 200, 300]);
    expect(identity).to.been.calledWith(300, 2, [100, 200, 300]);
  });

  it('should ignore non-indexed array values', function() {
    var arr = [1, 2, 3];
    arr.enchanter = null;

    every(identity, arr);

    expect(identity).to.have.been.calledThrice;
    expect(every(identity, arr)).to.be.true;
  });

  it('should work on objects', function() {
    expect(every(identity, { a: 'Tim', b: 'spam' })).to.be.true;
    expect(every(identity, { a: '', b: 'spam' })).to.be.false;
  });

  it('should ignore non-enumerable properties on objects', function() {
    var obj = Object.create(null, {
      a: { value: 1, enumerable: true },
      b: { value: 0, enumerable: false },
      c: { value: 2, enumerable: true },
    });

    expect(every(identity, obj)).to.be.true;
  });

  it('should ignore inherited properties on objects', function() {
    var parent = { a: 0 };
    var child = Object.create(parent);
    child.b = 1;

    expect(every(identity, child)).to.be.true;
  });

  it('should handle empty collections', function() {
    expect(every(identity, {})).to.be.true;
    expect(every(identity, [])).to.be.true;
  });

  it('should handle non-array/non-object values', function() {
    expect(every(identity, null)).to.be.true;
    expect(every(identity, 0)).to.be.true;
    expect(every(identity, '')).to.be.true;
    expect(every(identity, '000')).to.be.true;
    expect(every(identity, 'test')).to.be.true;
  });

  it('should throw an error when passed a non-function as its `fn` argument', function() {
    expect(function() { every('abc', [1, 2, 3]); }).to.throw();
    expect(function() { every('abc', [1, 2, 3]); }).to.throw();
  });
});
