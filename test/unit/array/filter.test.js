var filter = fungus.filter;
var identity = fungus.identity;
var truthy = fungus.truthy;

describe('filter', function() {
  var observe;

  beforeEach(function() {
    observe = sinon.spy(identity);
  });

  it('should be a function', function() {
    expect(filter).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(filter.length).to.equal(2);
  });

  it('should be curried', function() {
    var fn = filter(observe);

    expect(observe).to.have.not.beenCalled;

    fn()()()();

    expect(observe).to.have.not.beenCalled;

    fn([1]);

    expect(observe).to.have.been.calledOnce;
  });

  it('should return an array', function() {
    expect(filter(observe, [])).to.eql([]);
  });

  it('should return a list excluding elements for which the predicate function returns `false`', function() {
    var elems = ['', NaN, 0];

    expect(filter(truthy, elems)).to.eql([]);
  });

  it('should return a list including elements for which the predicate function returns `true`', function() {
    var elems = [1, 'a', '', { a: 'a' }, NaN];
    var trues = [1, 'a', { a: 'a' }, Object];

    expect(filter(truthy, elems)).to.eql([1, 'a', { a: 'a' }]);
    expect(filter(truthy, trues)).to.eql(trues);
  });

  xit('should work on non-array-like structures', function() {
  });

  it('should throw an error when the provided predicate function is not a function', function() {
    expect(function() { filter('fdsa', []); }).to.throw();
  });
});
