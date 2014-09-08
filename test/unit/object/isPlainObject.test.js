var isPlainObject = fungus.isPlainObject;

describe('isPlainObject', function() {
  var Spam;

  beforeEach(function() {
    Spam = function Foo() {
      this.flavor = 'Meh';
    };
  });

  it('should be a function', function() {
    expect(isPlainObject).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isPlainObject.length).to.equal(1);
  });

  it('should return `true` for plain objects', function() {
    expect(isPlainObject({})).to.be.true;
    expect(isPlainObject({ name: 'Tim' })).to.be.true;
    expect(isPlainObject(new Object())).to.be.true;
  });

  it('should return `true` for plain objects with a custom constructor property', function() {
    expect(isPlainObject({ constructor: Spam })).to.be.true;
  });

  it('should return `true` for plain objects with a `null` prototype', function() {
    expect(isPlainObject(Object.create(null))).to.be.true;
  });

  it('should return `true` for plain objects with a user-defined `valueOf` property', function() {
    expect(isPlainObject({ valueOf: 'custom' })).to.be.true;
  });

  it('should return `false` for non-plain objects', function() {
    expect(isPlainObject(true)).to.be.false;
    expect(isPlainObject(false)).to.be.false;
    expect(isPlainObject(['a', 'b', 'c'])).to.be.false;
    expect(isPlainObject(new Spam())).to.be.false;
    expect(isPlainObject('a')).to.be.false;
    expect(isPlainObject((function() { return arguments; }()))).to.be.false;
    expect(isPlainObject(Object)).to.be.false;
    expect(isPlainObject(Error)).to.be.false;
    expect(isPlainObject(new Error())).to.be.false;
  });
});
