describe('forOwn', function() {
  var forOwn = fungus.forOwn;

  var animals, observe;

  beforeEach(function() {
    animals = { fuzzy: ['rabbits'], furry: ['cats'], bald: ['eagles'] };

    observe = sinon.spy();
  });

  it('should be a function', function() {
    expect(forOwn).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(forOwn.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(forOwn).to.be.curried(observe, { a: 1 }, 'undefined');
  });

  it('should iterate in left-to-right order', function() {
    var results = [];
    var expected = [];

    forOwn(function(value, key) {
      results.push(key);
    }, animals);

    for (var key in animals) {
      expected.push(key);
    }

    expect(results).to.eql(expected);
  });

  it('should provide `iterator` with the `value`, `key`, and `object` as its arguments', function() {
    forOwn(observe, animals);

    expect(observe).to.have.been.calledWith(['rabbits'], 'fuzzy', animals);
    expect(observe).to.have.been.calledWith(['cats'], 'furry', animals);
    expect(observe).to.have.been.calledWith(['eagles'], 'bald', animals);
  });

  it('should call `iterator` once for every property on `object`', function() {
    forOwn(observe, animals);

    expect(observe).to.have.been.calledThrice;
  });

  it('should include the `length` property in iteration', function() {
    animals.length = 8;

    forOwn(observe, animals);

    expect(observe).to.have.callCount(4);
    expect(observe).to.have.been.calledWith(['rabbits'], 'fuzzy', animals);
    expect(observe).to.have.been.calledWith(['cats'], 'furry', animals);
    expect(observe).to.have.been.calledWith(['eagles'], 'bald', animals);
    expect(observe).to.have.been.calledWith(8, 'length', animals);
  });

  it('should ignore non-enumerable properties', function() {
    Object.defineProperty(animals, 'sneaky', {
      value: ['tiger'],
      enumerable: false
    });

    forOwn(observe, animals);

    expect(observe).to.have.been.calledThrice;
    expect(observe).to.have.not.been.calledWith(['tiger'], 'sneaky', animals);
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: true };
    var child = Object.create(parent, { child: { value: true, enumerable: true } });

    forOwn(observe, child);

    expect(observe).to.have.been.once;
    expect(observe).to.have.been.calledWith(true, 'child', child);
  });

  it('should exit iteration early when `iterator` returns `false`', function() {
    var alwaysFalse = sinon.spy(function() { return false; });

    forOwn(alwaysFalse, animals);

    expect(alwaysFalse).to.have.been.calledOnce;
  });

  it('should throw an error when `iterator` is not a function', function() {
    expect(function() { forOwn('lolno', {}); }).to.throw();
  });
});
