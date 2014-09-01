var foldr = fnjs.foldr;

describe('foldr', function() {
  xit('should be a function', function() {
    expect(foldr).to.be.a('function');
  });

  xit('should have an arity of 3', function() {
    expect(foldr.length).to.equal(3);
  });
});
