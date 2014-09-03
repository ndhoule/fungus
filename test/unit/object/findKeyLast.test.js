describe('findKeyLast', function() {
  var findKeyLast = fungus.findKeyLast;

  var alwaysFalse, alwaysTrue, animals, eq, observe;
  var fns = chai.factory.create('functions');

  beforeEach(function() {
    alwaysFalse = sinon.spy(fns.always(false));
    alwaysTrue = sinon.spy(fns.always(true));
    eq = fns.eq;
    observe = sinon.spy();

    animals = { a: 'aardvark', b: 'bear', c: 'cat', d: 'dingo' };
  });

  it('should be a function', function() {
    expect(findKeyLast).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(findKeyLast).to.have.length(2);
  });

  it('should be curried', function() {
    expect(findKeyLast(alwaysTrue)).to.be.a('function');
    expect(findKeyLast(alwaysTrue)()()()).to.be.a('function');
    expect(findKeyLast(alwaysTrue)(animals)).to.be.a('string');
    expect(findKeyLast(alwaysTrue)()()(animals)).to.be.a('string');
  });

  it('should return `undefined` when the predicate never returns `true`', function() {
    expect(findKeyLast(eq('pig'), animals)).to.be.undefined;
  });

  it('should return a (string) key when the predicate function returns `true`', function() {
    expect(findKeyLast(eq('cat'), animals)).to.be.a('string');
    expect(findKeyLast(eq('cat'), animals)).to.equal('c');
  });

  it('should invoke the `predicate` function with three values: `value`, `key`, `object`', function() {
    findKeyLast(observe, animals);

    expect(observe).to.have.callCount(4);
    expect(observe).to.have.been.calledWithExactly('aardvark', 'a', animals);
    expect(observe).to.have.been.calledWithExactly('bear', 'b', animals);
    expect(observe).to.have.been.calledWithExactly('cat', 'c', animals);
    expect(observe).to.have.been.calledWithExactly('dingo', 'd', animals);
  });

  it('should return the last key for which the predicate function returns `true`', function() {
    var matchesMultiple = function(val) {
      return eq('aardvark')(val) || eq('bear')(val);
    };

    // Get the first key in a platform-agnostic manner
    var lastKey;
    for (var key in animals) {
      if (matchesMultiple(animals[key])) {
        lastKey = key;
      }
    }

    expect(findKeyLast(matchesMultiple, animals)).to.equal(lastKey);
  });

  it('should stop iteration as soon as the predicate function returns `true`', function() {
    var obj = { 'a': 0, 'b': 1, 'c': 2 };
    // Get iteration order in a platform-agnostic manner
    var keys = fungus.keys(obj);
    var query = sinon.spy(eq(obj[keys[1]]));

    expect(findKeyLast(query, obj)).to.equal('b');
    expect(keys).to.have.length(3);
    expect(query).to.have.been.calledTwice;
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: 'parent' };
    var child = Object.create(parent);
    child.child = 'child';

    expect('parent' in child).to.be.true;
    expect(findKeyLast(eq('parent'), child)).to.be.undefined;
  });

  it('should ignore non-enumerable properties', function() {
    var person = Object.create({
      name: { value: 'Tim', enumerable: true },
      occupation: { value: 'enchanter', enumerable: true },
      fear: { value: 'rabbits', enumerable: false }
    });

    expect('fear' in person).to.be.true;
    expect(findKeyLast(eq('rabbits'), person)).to.be.undefined;
  });

  it('should work on arguments objects', function() {
    var args = (function() { return arguments; }('a', 'b', 'c'));

    expect(findKeyLast(eq('b'), args)).to.equal('1');
  });

  it('should work on string objects', function() {
    var string = new String('tim');

    expect(findKeyLast(eq('i'), string)).to.equal('1');
  });

  xit('should support a `pluck`-style `predicate`', function() {
    // TODO: https://github.com/ndhoule/fungus/issues/105
  });
});
