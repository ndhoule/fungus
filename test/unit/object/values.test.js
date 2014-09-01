var values = fungus.values;

describe('values', function() {
  it('should be a function', function() {
    expect(values).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(values.length).to.equal(1);
  });

  it('should retrieve a list of all values from an object', function() {
    var object = { a: 'aaa', b: 'bbb', c: 'ccc' };
    var expected = ['aaa', 'bbb', 'ccc'].sort();

    expect(values(object).sort()).to.eql(expected);
  });

  it('should ignore values on the object\'s prototype', function() {
    var parent = { ignore: true };
    var child = Object.create(parent);
    child.a = 'aaa';
    child.b = 'bbb';
    child.c = 'ccc';
    var expected = ['aaa', 'bbb', 'ccc'].sort();

    expect(values(child).sort()).to.eql(expected);
  });

  it('should work on arrays', function() {
    var array = [1, 2, 3];

    expect(values(array)).to.eql(array);
  });

  it('should work on string objects', function() {
    var string = new String('test');

    expect(values(string)).to.eql(['t', 'e', 's', 't']);
  });
});
