describe('max', function() {
  var max = fungus.max;

  var args;

  beforeEach(function() {
    args = chai.factory.create('objects.arguments');
  });

  it('should be a function', function() {
    expect(max).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(max).to.have.length(1);
  });

  it('should return -Infinity when passed an empty list', function() {
    expect(max([])).to.equal(-Infinity);
  });

  it('should return the maximum valued element in an array', function() {
    expect(max([9, 4, 6])).to.equal(9);
  });

  it('should work on objects', function() {
    expect(max({ a: 5, b: 10, c: 15 })).to.equal(15);
  });

  it('should work on arguments objects', function() {
    expect(max(args)).to.equal(5);
  });

  it('should handle a callback', function() {
    var people = [
      { name: 'Albert', age: 53 },
      { name: 'Tim', age: 600 },
      { name: 'Thomas', age: 31 }
    ];

    expect(max(people, function(person) { return person.age; })).to.equal(people[1]);
  });

  it('should return the first element when elements are equal', function() {
    var people = [
      { name: 'Albert', age: 600 },
      { name: 'Tim', age: 600 },
      { name: 'Thomas', age: 600 }
    ];

    expect(max(people, function(person) { return person.age; })).to.equal(people[0]);
  });
});
