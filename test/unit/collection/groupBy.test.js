var groupBy = fnjs.groupBy;
var identity = fnjs.identity;
var get = fnjs.get;

describe('groupBy', function() {
  var evenOrOdd, length, first, observe;

  beforeEach(function() {
    observe = sinon.spy(identity);
    evenOrOdd = sinon.spy(function(a) { return a % 2 === 0 ? 'even' : 'odd'; });
    first = sinon.spy(function(str) { return str[0]; });
    length = sinon.spy(get('length'));
  });

  it('should be a function', function() {
    expect(groupBy).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(groupBy.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(groupBy()).to.be.a('function');
    expect(groupBy(observe)).to.be.a('function');
    expect(observe).to.have.not.been.called;
    expect(groupBy(observe)()()()([1])).to.be.an('object');
    expect(observe).to.have.been.calledOnce;
  });

  it('should work when `collection` is an array', function() {
    var letters = ['a', 'ccc', 'bb'];
    var result = { '1': ['a'], '2': ['bb'], '3': ['ccc'] };

    expect(groupBy(length, letters)).to.eql(result);
  });

  it('should work when `collection` is an object', function() {
    var names = { stephen: 'hawking', albert: 'einstein', isaac: 'newton' };
    var result = { '6': ['newton'], '7': ['hawking'], '8': ['einstein'] };

    expect(groupBy(length, names)).to.eql(result);
  });

  it('should ignore inherited properties on `collection` arrays', function() {
    Object.defineProperty(Array.prototype, 'ignore', {
      value: 'bulgogi',
      configurable: true,
      enumerable: true
    });
    var foods = ['turkey', 'beef', 'tomato'];
    var categorized = groupBy(first, foods);

    expect(foods.ignore).to.equal('bulgogi');

    expect(first).to.have.been.calledThrice;
    expect(first).to.have.been.calledWith('turkey');
    expect(first).to.have.been.calledWith('tomato');
    expect(first).to.have.been.calledWith('beef');
    expect(first).to.have.not.been.calledWith('bulgogi');

    delete Array.prototype.ignore;
  });

  it('should ignore inherited properties on `collection` objects', function() {
    var parent = { sheila: 'bulgogi' };
    var preferences = Object.create(parent, {
      bob: { value: 'turkey', enumerable: true },
      jill: { value: 'tomato', enumerable: true},
      tim: { value: 'beef', enumerable: true }
    });

    var categorized = groupBy(first, preferences);

    expect(first).to.have.been.calledThrice;
    expect(first).to.have.been.calledWith('turkey');
    expect(first).to.have.been.calledWith('tomato');
    expect(first).to.have.been.calledWith('beef');
    expect(first).to.have.not.been.calledWith('bulgogi');
  });

  it('should use the return value of the `aggregator` as the grouping key', function() {
    expect(groupBy(evenOrOdd, [1, 2, 3, 4])).to.eql({ even: [2, 4], odd: [1, 3] });
  });

  it('should allow the user to pass a string as the `aggregator`', function() {
    var dogs = ['shiba', 'lab', 'akita'];
    var expected = { '3': ['lab'], '5': ['shiba', 'akita'] };

    expect(groupBy('length', dogs)).to.eql(expected);
  });

  xit('should handle `pluck`-style object aggregators', function() {});

  it('should use the value\'s identity when passed a non-existy value', function() {
    var dogs = ['shiba', 'lab', 'akita'];
    var expected = { shiba: ['shiba'], lab: ['lab'], akita: ['akita'] };

    expect(groupBy(null, dogs)).to.eql(expected);
    expect(groupBy(undefined, dogs)).to.eql(expected);
  });

  it('should gracefully handle other data types as the `aggregator`', function() {
    var dogs = ['shiba', 'lab', 'akita'];

    expect(groupBy(0, dogs)).to.eql({ a: ['akita'], s: ['shiba'], l: ['lab'] });
    expect(groupBy(10, dogs)).to.eql({ undefined: ['shiba', 'lab', 'akita'] });
    expect(groupBy(true, dogs)).to.eql({ undefined: ['shiba', 'lab', 'akita'] });
    expect(groupBy(/test/, dogs)).to.eql({ undefined: ['shiba', 'lab', 'akita'] });
  });
});
