describe('forEachRight', function() {
  var forEachRight = fungus.forEachRight;

  var identity;

  beforeEach(function() {
    identity = chai.factory.create('functions.identity');
  });

  it('should be a function', function() {
    expect(forEachRight).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(forEachRight.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(forEachRight).to.be.curried(identity, [1], 'undefined');
  });

  it('should work on arrays', function() {
    var elems = ['a', 'b', 'c', 'd'];

    forEachRight(identity, elems);

    expect(identity.firstCall).to.have.been.calledWithExactly('d', 3, elems);
    expect(identity.secondCall).to.have.been.calledWithExactly('c', 2, elems);
    expect(identity.thirdCall).to.have.been.calledWithExactly('b', 1, elems);
    expect(identity.lastCall).to.have.been.calledWithExactly('a', 0, elems);
  });

  it('should work on objects (with no guarantee of iteration order)', function() {
    var elems = { a: 1, b: 2, c: 3 };
    // Compensate for object iteration being platform independent by getting
    // this platform's iteration order
    var iter = fungus.keys(elems).reverse();


    forEachRight(identity, elems);

    expect(identity.firstCall).to.have.been.calledWithExactly(elems[iter[0]], iter[0], elems);
    expect(identity.secondCall).to.have.been.calledWithExactly(elems[iter[1]], iter[1], elems);
    expect(identity.thirdCall).to.have.been.calledWithExactly(elems[iter[2]], iter[2], elems);
  });

  it('should work on strings', function() {
    var string = 'tim';

    forEachRight(identity, string);

    expect(identity.firstCall).to.have.been.calledWithExactly(string[2], 2, string);
    expect(identity.secondCall).to.have.been.calledWithExactly(string[1], 1, string);
    expect(identity.thirdCall).to.have.been.calledWithExactly(string[0], 0, string);
  });

  it('should work on string objects', function() {
    var string = new String('tim');

    forEachRight(identity, string);

    expect(identity.firstCall).to.have.been.calledWithExactly(string[2], 2, string);
    expect(identity.secondCall).to.have.been.calledWithExactly(string[1], 1, string);
    expect(identity.thirdCall).to.have.been.calledWithExactly(string[0], 0, string);
  });

  it('should iterate in right-to-left order', function() {
    var elems = [1, 0, 7, 14];

    forEachRight(identity, elems);

    expect(identity.firstCall).to.have.been.calledWithExactly(14, 3, elems);
    expect(identity.secondCall).to.have.been.calledWithExactly(7, 2, elems);
    expect(identity.thirdCall).to.have.been.calledWithExactly(0, 1, elems);
    expect(identity.lastCall).to.have.been.calledWithExactly(1, 0, elems);
  });

  it('should ignore enumerable items on prototypes', function() {
    var parent = { enchanter: 'Tim' };
    var child = Object.create(parent);
    child.a = 1;

    forEachRight(identity, child);

    expect(identity).to.have.been.calledOnce;
    expect(identity).to.have.been.calledWith(1, 'a', child);
    expect(identity).to.have.not.been.calledWith('Tim', 'enchanter');
  });

  it('should ignore non-enumerable items', function() {
    var obj = Object.create(null, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false },
      c: { value: 3, enumerable: true }
    });

    forEachRight(identity, obj);

    expect(identity).to.have.been.calledOnce;
    expect(identity).to.have.been.calledWith(3, 'c', obj);
  });

  it('should give the input callback access to the value, index, and collection', function() {
    var elems = ['zero', 'one', 'two'];

    forEachRight(identity, elems);

    expect(identity).to.have.been.calledWith('two', 2, elems);
    expect(identity).to.have.been.calledWith('one', 1, elems);
    expect(identity).to.have.been.calledWith('zero', 0, elems);
  });

  it('should perform an action on each element', function() {
    var elems = [5, 4, 3, 2, 1];

    forEachRight(identity, elems);

    expect(identity).to.have.callCount(5);
    expect(identity).to.have.been.calledWith(1);
    expect(identity).to.have.been.calledWith(2);
    expect(identity).to.have.been.calledWith(3);
    expect(identity).to.have.been.calledWith(4);
    expect(identity).to.have.been.calledWith(5);
  });

  it('should permit mutation of the input collection', function() {
    var elems = [5, 4, 3, 2, 1];

    forEachRight(function(val, i, coll) { coll[i] = 'omg'; }, elems);

    expect(elems).to.eql(['omg', 'omg', 'omg', 'omg', 'omg']);
  });

  it('should exit early when the provided callback returns `false`', function() {
    var elems = [1, 2, 3, false, 4];

    forEachRight(identity, elems);

    expect(identity).to.have.callCount(2);
    expect(identity).to.have.been.calledWith(4);
    expect(identity).to.have.been.calledWith(false);
    expect(identity).to.have.not.been.calledWith(3);
    expect(identity).to.have.not.been.calledWith(2);
    expect(identity).to.have.not.been.calledWith(1);
  });

  it('should always return `undefined`', function() {
    expect(forEachRight(identity, [1, 2, 3])).to.be.undefined;
  });
});
