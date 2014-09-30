describe('findKey', function() {
  var findKey = fungus.findKey;

  var alwaysFalse, alwaysTrue, animals, eq, noop;

  beforeEach(function() {
    alwaysFalse = chai.factory.create('functions.always', false);
    alwaysTrue = chai.factory.create('functions.always', true);
    eq = chai.factory.create('functions.eq');
    noop = chai.factory.create('functions.noop');

    animals = { a: 'aardvark', b: 'bear', c: 'cat', d: 'dingo' };
  });

  it('should be a function', function() {
    expect(findKey).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(findKey).to.have.length(2);
  });

  it('should be curried', function() {
    expect(findKey).to.be.curried(alwaysTrue, animals, 'string');
  });

  it('should return `undefined` when the predicate never returns `true`', function() {
    expect(findKey(eq('pig'), animals)).to.be.undefined;
  });

  it('should return a (string) key when the predicate function returns `true`', function() {
    expect(findKey(eq('cat'), animals)).to.be.a('string');
    expect(findKey(eq('cat'), animals)).to.equal('c');
  });

  it('should invoke the `predicate` function with three values: `value`, `key`, `object`', function() {
    findKey(noop, animals);

    expect(noop).to.have.callCount(4);
    expect(noop).to.have.been.calledWithExactly('aardvark', 'a', animals);
    expect(noop).to.have.been.calledWithExactly('bear', 'b', animals);
    expect(noop).to.have.been.calledWithExactly('cat', 'c', animals);
    expect(noop).to.have.been.calledWithExactly('dingo', 'd', animals);
  });

  it('should return the first key for which the predicate function returns `true`', function() {
    var matchesMultiple = function(val) {
      return eq('aardvark')(val) || eq('bear')(val);
    };

    // Get the first key in a platform-agnostic manner
    var firstKey;
    for (var key in animals) {
      if (firstKey === undefined && matchesMultiple(animals[key], key, animals)) {
        firstKey = key;
      }
    }

    expect(findKey(matchesMultiple, animals)).to.equal(firstKey);
  });

  it('should stop iteration as soon as the predicate function returns `true`', function() {
    var obj = { 'a': 0, 'b': 1, 'c': 2 };
    // We can't predict iteration order across platforms, so get a value from a
    // position in the object where we know continued iteration is possible
    var keys = fungus.keys(obj);
    var query = sinon.spy(eq(obj[keys[1]]));

    expect(findKey(query, obj)).to.equal('b');
    expect(keys).to.have.length(3);
    expect(query).to.have.been.calledTwice;
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: 'parent' };
    var child = Object.create(parent);
    child.child = 'child';

    expect('parent' in child).to.be.true;
    expect(findKey(eq('parent'), child)).to.be.undefined;
  });

  it('should ignore non-enumerable properties', function() {
    var person = Object.create({
      name: { value: 'Tim', enumerable: true },
      occupation: { value: 'enchanter', enumerable: true },
      fear: { value: 'rabbits', enumerable: false }
    });

    expect('fear' in person).to.be.true;
    expect(findKey(eq('rabbits'), person)).to.be.undefined;
  });

  it('should work on arguments objects', function() {
    var args = (function() { return arguments; }('a', 'b', 'c'));

    expect(findKey(eq('b'), args)).to.equal('1');
  });

  it('should work on string objects', function() {
    var string = new String('tim');

    expect(findKey(eq('i'), string)).to.equal('1');
  });

  xit('should support a `pluck`-style `predicate`', function() {
    // TODO: https://github.com/ndhoule/fungus/issues/105
  });
});
