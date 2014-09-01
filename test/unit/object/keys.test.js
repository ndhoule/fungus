var keys = fnjs.keys;

describe('keys', function() {
  it('should be a function', function() {
    expect(keys).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(keys.length).to.equal(1);
  });

  it('it should return a list of the object\'s keys', function() {
    expect(keys({ a: 1, b: 2, c: 3 })).to.eql(['a', 'b', 'c']);
  });

  it('should ignore inherited properties', function() {
    var parent = { hidden: true };
    var child = Object.create(parent);
    child.visible = true;

    expect(keys(child)).to.eql(['visible']);
  });

  it('should skip keys in sparse arrays', function() {
    var sparse = [1];
    sparse[3] = 2;

    expect(keys(sparse)).to.eql(['0', '3']);
  });

  it('should ignore non-enumerable properties', function() {
    var object = { visible: true };
    Object.defineProperty(object, 'hidden', {
      value: true,
      enumerable: false
    });

    expect(keys(object)).to.eql(['visible']);
  });

  it('should return an empty array when passed `null` or `undefined` values', function() {
    expect(keys(null)).to.eql([]);
    expect(keys(undefined)).to.eql([]);
  });

  it('should return an empty array when passed primitive values', function() {
  });

  it('should work on arrays', function() {
    expect(keys([])).to.eql([]);
    expect(keys(['a', 'b', 'c'])).to.eql(['0', '1', '2']);
  });

  it('should work on arguments objects', function() {
    (function() {
      expect(keys(arguments)).to.eql(['0', '1', '2']);
    }('a', 'b', 'c'));
  });

  it('should work on string objects', function() {
    expect(keys(new String('abc'))).to.eql(['0', '1', '2']);
  });

  it('should return an empty array for primitive values', function() {
    expect(keys('abc')).to.eql([]);
    expect(keys(true)).to.eql([]);
    expect(keys(/fdsa/)).to.eql([]);
    expect(keys(123)).to.eql([]);
  });
});
