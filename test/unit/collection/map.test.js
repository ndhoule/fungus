var map = fungus.map;
var identity = fungus.identity;

describe('map', function() {
  var observe, square;

  beforeEach(function() {
    observe = sinon.spy(identity);
    square = function(a) { return a * a };
  });

  it('should be a function', function() {
    expect(map).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(map.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(map()).to.be.a('function');
    expect(map(observe)).to.be.a('function');
    expect(observe).to.have.not.been.called;
    expect(map(observe)()()()([1])).to.be.an('array');
    expect(observe).to.have.been.calledOnce;
  });

  it('should return a new array', function() {
    var numbers = [1, 2, 3];
    var newNumbers = map(identity, numbers);

    expect(newNumbers).to.eql(numbers);
    expect(newNumbers).to.not.equal(numbers);
  });

  it('should call the input function once for each item in the collection', function() {
    map(observe, [1, 2, 3]);

    expect(observe).to.have.been.calledThrice;
  });

  it('should return an array containing the results of calling the input function', function() {
    expect(map(square, [1, 2, 3])).to.eql([1, 4, 9]);
  });

  it('should pass the input function three arguments: value, index, and array', function() {
    var array = ['a', 'b', 'c'];
    map(observe, array);

    expect(observe).to.have.been.calledWith('a', 0, array);
    expect(observe).to.have.been.calledWith('b', 1, array);
    expect(observe).to.have.been.calledWith('c', 2, array);
  });

  it('should iterate over arrays in indexed order', function() {
    var array = ['a', 'b', 'c'];
    var result = map(identity, array);

    expect(result).to.eql(['a', 'b', 'c']);
  });

  it('should ignore enumerable properties on arrays', function() {
    var array = ['a', 'b', 'c'];
    array.a = 'spam';
    map(observe, array);

    expect(observe).to.have.been.calledWith('a', 0, array);
    expect(observe).to.have.been.calledWith('b', 1, array);
    expect(observe).to.have.been.calledWith('c', 2, array);
    expect(observe).to.have.not.been.calledWith('spam', 'a', array);
  });

  it('should map over objects', function() {
    var obj = { a: 1, b: 2, c: 3 };
    map(observe, obj);

    expect(observe).to.have.been.calledWith(1, 'a', obj);
    expect(observe).to.have.been.calledWith(2, 'b', obj);
    expect(observe).to.have.been.calledWith(3, 'c', obj);
  });

  // TODO: How to make this test useful? What should this behavior be?
  // TODO: Modify the documentation's `param` types when this is changed
  xit('should not make any guarantees on object iteration order other than those made by the host engine', function() {
  });

  it('should ignore properties up the prototype chain when mapping over objects', function() {
    var parent = { z: 4 };
    var child = Object.create(parent);
    child.a = 1;
    child.b = 2;
    child.c = 3;

    map(observe, child);

    expect(observe).to.have.not.been.calledWith(4, 'z', child);
  });

  it('should ignore non-enumerable items', function() {
    var obj = Object.create(null, {
      a: { value: 1, enumerable: false },
      b: { value: 2, enumerable: false },
      c: { value: 3, enumerable: true }
    });

    map(observe, obj);

    expect(observe).to.have.been.calledOnce;
    expect(observe).to.have.been.calledWith(3, 'c', obj);
  });

  xit('should map over strings', function() {
    var str = 'spam';
    map(observe, str);

    expect(observe).to.have.been.calledWith('s', 0, str);
    expect(observe).to.have.been.calledWith('p', 1, str);
    expect(observe).to.have.been.calledWith('a', 2, str);
    expect(observe).to.have.been.calledWith('m', 3, str);
  });

  it('should throw an error when passed a non-function as its `fn` argument', function() {
    expect(function() { map('omg', []); }).to.throw();
    expect(function() { map('omg', [1, 2, 3]); }).to.throw();
  });
});
