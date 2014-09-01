var extend = fungus.extend;

describe('extend', function() {
  it('should be a function', function() {
    expect(extend).to.be.a('function');
  });

  it('should have an arity of 0', function() {
    expect(extend.length).to.equal(0);
  });

  it('should copy owned properties onto a new object', function() {
    var parent = { parent: true };
    var child = Object.create(parent);
    child.child = true;

    expect(extend(child)).to.be.an('object');
    expect(extend(child)).to.not.equal(child);
    expect(extend(child)).to.have.keys(['child']);
  });

  it('should work with multiple arguments', function() {
    var a = { a: 'a', aa: 'aa' };
    var b = { b: 'b' };
    var c = { c: 'c', cc: 'cc', ccc: 'ccc' };
    var expected = { a: 'a', aa: 'aa', b: 'b', c: 'c', cc: 'cc', ccc: 'ccc' };

    expect(extend(a, b, c)).to.eql(expected);
  });

  it('should not mutate the first argument', function() {
    var obj = { a: 'a' };
    var obj2 = { b: 'b' };

    extend(obj, obj2);

    expect(extend(obj, obj2)).to.not.equal(obj);
  });

  it('should skip non-enumerable properties on source objects', function() {
    var obj = { a: 'a' };
    Object.defineProperty(obj, 'ignore', { value: true, enumerable: false });

    expect(extend(obj, { b: 'b' })).to.eql({ a: 'a', b: 'b' });
  });

  it('should skip inherited properties on source objects', function() {
    var parent = { parent: true };
    var child = Object.create(parent);
    child.child = true;
    var another = { another: true };

    expect(extend(child, another)).to.eql({ child: true, another: true });
  });

  it('should copy falsy values from source objects', function() {
    var obj = { a: 'a', b: null };
    var obj2 = { c: undefined };
    var obj3 = { d: false, e: 0 };
    var expected = { a: 'a', b: null, c: undefined, d: false, e: 0 };

    expect(extend(obj, obj2, obj3)).to.eql(expected);
  });
});
