describe('forInRight', function() {
  var forInRight = fungus.forInRight;

  var animals, observe;

  beforeEach(function() {
    animals = { fuzzy: ['rabbits'], furry: ['cats'], bald: ['eagles'] };

    observe = sinon.spy();
  });

  it('should be a function', function() {
    expect(forInRight).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(forInRight.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(forInRight).to.be.curried(observe, { a: 1 }, 'undefined');
  });

  it('should iterate in right-to-left order', function() {
    var results = [];
    var expected = [];

    forInRight(function(value, key) {
      results.push(key);
    }, animals);

    for (var key in animals) {
      expected.push(key);
    }

    expect(results).to.eql(expected.reverse());
  });

  it('should provide `iterator` with the `value`, `key`, and `object` as its arguments', function() {
    forInRight(observe, animals);

    expect(observe).to.have.been.calledWith(['rabbits'], 'fuzzy', animals);
    expect(observe).to.have.been.calledWith(['cats'], 'furry', animals);
    expect(observe).to.have.been.calledWith(['eagles'], 'bald', animals);
  });

  it('should call `iterator` once for every property on `object`', function() {
    forInRight(observe, animals);

    expect(observe).to.have.been.calledThrice;
  });

  it('should include the `length` property in iteration', function() {
    animals.length = 8;

    forInRight(observe, animals);

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

    forInRight(observe, animals);

    expect(observe).to.have.been.calledThrice;
    expect(observe).to.have.not.been.calledWith(['tiger'], 'sneaky', animals);
  });

  it('should iterate over inherited properties', function() {
    var parent = { parent: true };
    var child = Object.create(parent, { child: { value: true, enumerable: true } });

    forInRight(observe, child);

    expect(observe).to.have.been.calledTwice;
    expect(observe).to.have.been.calledWith(true, 'parent', child);
    expect(observe).to.have.been.calledWith(true, 'child', child);
  });

  it('should exit iteration early when `iterator` returns `false`', function() {
    var alwaysFalse = sinon.spy(function() { return false; });

    forInRight(alwaysFalse, animals);

    expect(alwaysFalse).to.have.been.calledOnce;
  });

  it('should throw an error when `iterator` is not a function', function() {
    expect(function() { forInRight('lolno', {}) }).to.throw();
  });
});
