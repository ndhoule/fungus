describe('get', function() {
  var get = fungus.get;

  it('should be a function', function() {
    expect(get).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(get.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(get).to.be.curried('omg', { omg: 1  }, 'number');
  });

  it('should return a value when one is defined at a given key', function() {
    expect(get('omg', { omg: 'yes' })).to.equal('yes');
  });

  it('should fetch falsy values', function() {
    expect(get('omg', { omg: false })).to.be.false;
  });

  it('should return undefined when no property found', function() {
    expect(get('omg', {})).to.be.undefined;
  });

  it('should gracefully handle bad values', function() {
    expect(function() { get('lol', null); }).to.not.throw();
    expect(get('lol', null)).to.be.undefined;
    expect(function() { get('lol', undefined); }).to.not.throw();
    expect(get('lol', undefined)).to.be.undefined;
  });
});
