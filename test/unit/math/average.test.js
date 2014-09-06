describe('average', function() {
  var args;

  beforeEach(function() {
    args = chai.factory.create('objects.arguments');
  });

  it('should be a function', function() {
    expect(fungus.average).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(fungus.average).to.have.length(1);
  });

  it('should return the average of all numbers in an array', function() {
    expect(fungus.average([9, 4, 6])).to.be.closeTo(6.3, 0.1);
  });

  it('should work on objects', function() {
    expect(fungus.average({ a: 5, b: 10, c: 15 })).to.equal(10);
  });

  it('should work on arguments objects', function() {
    expect(fungus.average(args)).to.equal(3);
  });
});
