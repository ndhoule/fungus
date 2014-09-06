describe('min', function() {
  var min = fungus.min;

  var args;

  beforeEach(function() {
    args = chai.factory.create('objects.arguments');
  });

  it('should be a function', function() {
    expect(min).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(min).to.have.length(1);
  });

  it('should return Infinity when passed an empty list', function() {
    expect(min([])).to.equal(Infinity);
  });

  it('should return the minimum valued element in an array', function() {
    expect(min([9, 4, 6])).to.equal(4);
  });

  it('should work on objects', function() {
    expect(min({ a: 5, b: 10, c: 15 })).to.equal(5);
  });

  it('should work on arguments objects', function() {
    expect(min(args)).to.equal(1);
  });

  it('should handle a callback', function() {
    var people = [
      { name: 'Albert', age: 53 },
      { name: 'Tim', age: 600 },
      { name: 'Thomas', age: 31 }
    ];

    expect(min(people, function(person) { return person.age; })).to.equal(people[2]);
  });

  it('should return the first element when elements are equal', function() {
    var people = [
      { name: 'Albert', age: 600 },
      { name: 'Tim', age: 600 },
      { name: 'Thomas', age: 600 }
    ];

    expect(min(people, function(person) { return person.age; })).to.equal(people[0]);
  });
});
