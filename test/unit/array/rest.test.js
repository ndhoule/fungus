describe('rest', function() {
  var rest = fungus.rest;

  it('should be a function', function() {
    expect(rest).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(rest.length).to.equal(1);
  });

  it('should return an array', function() {
    expect(rest([1, 2, 3])).to.be.an('array');
  });

  it('should return all but the first element from from an array', function() {
    expect(rest(['a', 'b', 'c'])).to.eql(['b', 'c']);
  });

  it('should not mutate its input array', function() {
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    var arr = [obj1, obj2, obj3];

    rest(arr);

    expect(arr).to.eql([obj1, obj2, obj3]);
  });

  it('should should tolerate empty arrays', function() {
    expect(rest([])).to.eql([]);
  });

  it('should work on `arguments` objects', function() {
    (function() {
      expect(rest(arguments)).to.eql([2, 3]);
    }(1, 2, 3));
  });

  it('should work on strings', function() {
    expect(rest('spam').join('')).to.equal('pam');
  });

  xit('should should tolerate non-array arguments', function() {
    expect(rest()).to.eql([]);
    expect(rest(1)).to.eql([]);
    expect(rest(true)).to.eql([]);
    expect(rest(false)).to.eql([]);
    expect(rest(null)).to.eql([]);
    expect(rest(undefined)).to.eql([]);
  });
});
