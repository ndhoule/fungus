var forEach = fungus.forEach;
var identity = fungus.identity;

describe('forEach', function() {
  var observe, identitySpy;

  beforeEach(function() {
    observe = sinon.spy();
    identitySpy = sinon.spy(identity);
  });

  it('should be a function', function() {
    expect(forEach).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(forEach.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(forEach()).to.be.a('function');
    expect(forEach(observe)).to.be.a('function');
    expect(observe).to.have.not.been.called;
    expect(forEach(observe)()()()([1])).to.be.undefined;
    expect(observe).to.have.been.calledOnce;
  });

  it('should work on arrays', function() {
    var elems = ['a', 'b', 'c', 'd'];

    forEach(observe, elems);

    expect(observe).to.have.callCount(4);
    expect(observe).to.have.been.calledWith('a', 0, elems);
    expect(observe).to.have.been.calledWith('b', 1, elems);
    expect(observe).to.have.been.calledWith('c', 2, elems);
    expect(observe).to.have.been.calledWith('d', 3, elems);
  });

  it('should work on objects', function() {
    var elems = { a: 1, b: 2, c: 3 };

    forEach(observe, elems);

    expect(observe).to.have.been.calledThrice;
    expect(observe).to.have.been.calledWith(1, 'a', elems);
    expect(observe).to.have.been.calledWith(2, 'b', elems);
    expect(observe).to.have.been.calledWith(3, 'c', elems);
  });

  xit('should work on strings', function() {
    var string = 'timmy';

    forEach(observe, string);

    expect(observe).to.have.callCount(5);
    expect(observe).to.have.been.calledWith('t', 0, string);
    expect(observe).to.have.been.calledWith('i', 1, string);
    expect(observe).to.have.been.calledWith('m', 2, string);
    expect(observe).to.have.been.calledWith('m', 3, string);
    expect(observe).to.have.been.calledWith('y', 4, string);
  });

  it('should iterate in right-to-left order on arrays', function() {
    var elems = [7, 0, 7, 14, 91];
    var result = [];

    forEach(function(elem) { result.push(elem); }, elems);
    expect(result).to.eql(elems);
  });

  xit('should iterate in right-to-left order on strings', function() {
    var string = 'timmy';
    var result = [];

    forEach(function(elem) { result.push(elem) }, elems);
    expect(result.join('')).to.eql(string);
  });

  // TODO: How to make this test useful? What should this behavior be?
  // TODO: Modify the documentation's `param` types when this is changed
  xit('should not make any guarantees on object iteration order other than those made by the host engine');

  it('should ignore enumerable items on prototypes', function() {
    var parent = { enchanter: 'Tim' };
    var child = Object.create(parent);
    child.a = 1;

    forEach(observe, child);

    expect(observe).to.have.been.calledOnce;
    expect(observe).to.have.been.calledWith(1, 'a', child);
    expect(observe).to.have.not.been.calledWith('Tim', 'enchanter');
  });

  it('should ignore non-enumerable items', function() {
    var obj = Object.create(null, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false },
      c: { value: 3, enumerable: true }
    });

    forEach(observe, obj);

    expect(observe).to.have.been.calledOnce;
    expect(observe).to.have.been.calledWith(3, 'c', obj);
  });

  it('should give the input callback access to the value, index, and collection', function() {
    var elems = ['zero', 'one', 'two'];

    forEach(observe, elems);

    expect(observe).to.have.been.calledWith('zero', 0, elems);
    expect(observe).to.have.been.calledWith('one', 1, elems);
    expect(observe).to.have.been.calledWith('two', 2, elems);
  });

  it('should perform an action on each element', function() {
    var elems = [5, 4, 3, 2, 1];

    forEach(observe, elems);

    expect(observe).to.have.callCount(5);
    expect(observe).to.have.been.calledWith(5);
    expect(observe).to.have.been.calledWith(4);
    expect(observe).to.have.been.calledWith(3);
    expect(observe).to.have.been.calledWith(2);
    expect(observe).to.have.been.calledWith(1);
  });

  it('should permit mutation of the input collection', function() {
    var elems = [5, 4, 3, 2, 1];

    forEach(function(val, i, coll) { coll[i] = 'omg'; }, elems);

    expect(elems).to.eql(['omg', 'omg', 'omg', 'omg', 'omg']);
  });

  it('should exit early when the provided callback returns `false`', function() {
    var elems = [1, 2, 3, false, 4];

    forEach(identitySpy, elems);

    expect(identitySpy).to.have.callCount(4);
    expect(identitySpy).to.have.been.calledWith(1);
    expect(identitySpy).to.have.been.calledWith(2);
    expect(identitySpy).to.have.been.calledWith(3);
    expect(identitySpy).to.have.been.calledWith(false);
    expect(identitySpy).to.have.not.been.calledWith(4);
  });

  it('should always return `undefined`', function() {
    expect(forEach(identity, [1, 2, 3])).to.be.undefined;
  });
});
