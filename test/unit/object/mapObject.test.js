describe('mapObject', function() {
  var mapObject = fungus.mapObject;

  var identity;

  beforeEach(function() {
    identity = chai.factory.create('functions.identity');
  });

  it('should be a function', function() {
    expect(mapObject).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(mapObject.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(mapObject(identity)).to.be.a('function');
    expect(mapObject()(identity)()()()).to.be.a('function');
    expect(mapObject(identity)({})).to.be.a('object');
    expect(mapObject()(identity)()()({})).to.be.a('object');
  });

  it('should apply a function to each value on the input `object`', function() {
    var obj = { key1: 5, key2: 10 };
    var expected = { key1: 10, key2: 20 };

    expect(mapObject(function(x) { return x * 2; }, obj)).to.eql(expected);
  });

  it('should return a new object', function() {
    var obj = { key1: 5, key2: 10 };

    expect(mapObject(identity, obj)).to.not.equal(obj);
  });

  it('should call the `iterator` once for each enumerable own value in the `object`', function() {
    var obj = { key1: 'tim', key2: 'enchanter' };
    var expected = { key1: 'tim', key2: 'enchanter' };

    mapObject(identity, obj);

    expect(identity).to.have.been.calledTwice;
  });

  it('should handle an object with a `.length` property', function() {
    var obj = { key1: 'tim', key2: 'enchanter', length: 100 };
    var expected = { key1: 'tim100', key2: 'enchanter100', length: 200 };
    var add100 = sinon.spy(function (val) { return val + 100; });

    expect(mapObject(add100, obj)).to.eql(expected);
    expect(add100).to.have.been.calledThrice;
  });

  it('should ignore non-enumerable properties', function() {
    var obj = Object.create(null, {
      key1: { value: 5, enumerable: true },
      key2: { value: 10, enumerable: true },
      hidden: { value: 15, enumerable: false }
    });

    expect(mapObject(identity, obj)).to.have.property('key1');
    expect(mapObject(identity, obj)).to.have.property('key2');
    expect(mapObject(identity, obj)).to.not.have.property('hidden');
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: true };
    var child = Object.create(parent);
    child.child = true;

    expect(mapObject(identity, child)).to.not.have.property('parent');
  });

  it('should throw an error when passed a non-function `iterator` argument', function() {
    expect(function() { mapObject('test', { a: 'a' }); }).to.throw();
  });

  it('should work on arrays', function() {
    var arr = ['a', 'b', 'c'];
    var expected = { '0': 'a', '1': 'b', '2': 'c' };

    expect(mapObject(identity, arr)).to.eql(expected);
  });

  it('should work on string objects', function() {
    var str = new String('test');
    var expected = new String('TEST');

    expect(mapObject(function(val) { return val.toUpperCase(); }, str)).to.eql(expected);
  });

  it('should handle other complex object types gracefully', function() {
    expect(mapObject(identity, new Number(1))).to.eql(new Number(1));
    expect(mapObject(identity, new Boolean(1))).to.eql(new Boolean(true));
  });

  it('should handle `null` and `undefined` as its `object` parameter', function() {
    expect(mapObject(identity, null)).to.eql({});
    expect(mapObject(identity, undefined)).to.eql({});
  });

  it('should gracefully handle non-object values', function() {
    expect(mapObject(identity, 1)).to.eql({});
    expect(mapObject(identity, true)).to.eql({});
    expect(mapObject(identity, false)).to.eql({});
    expect(mapObject(identity, Infinity)).to.eql({});
    expect(mapObject(identity, /fasd/)).to.eql({});
  });
});
