import { NOT_FUNC_EXCEPTION } from '../../../dist/internal/exceptions';
import { forIn } from '../../../dist/object/forIn';

describe('forIn', function() {
  var animals, observe;

  beforeEach(function() {
    animals = { fuzzy: ['rabbits'], furry: ['cats'], bald: ['eagles'] };

    observe = sinon.spy();
  });

  it('should be a function', function() {
    expect(forIn).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(forIn.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(forIn(observe)).to.be.a('function');
    expect(forIn(observe)()()()).to.be.a('function');
    expect(forIn(observe)({})).to.be.undefined;
    expect(forIn(observe)()()({})).to.be.undefined;
  });

  it('should iterate in left-to-right order', function() {
    var results = [];
    var expected = [];

    forIn(function(value, key) {
      results.push(key);
    }, animals);

    for (var key in animals) {
      expected.push(key);
    }

    expect(results).to.eql(expected);
  });

  it('should provide `iterator` with the `value`, `key`, and `object` as its arguments', function() {
    forIn(observe, animals);

    expect(observe).to.have.been.calledWith(['rabbits'], 'fuzzy', animals);
    expect(observe).to.have.been.calledWith(['cats'], 'furry', animals);
    expect(observe).to.have.been.calledWith(['eagles'], 'bald', animals);
  });

  it('should call `iterator` once for every property on `object`', function() {
    forIn(observe, animals);

    expect(observe).to.have.been.calledThrice;
  });

  it('should include the `length` property in iteration', function() {
    animals.length = 8;

    forIn(observe, animals);

    expect(observe).to.have.callCount(4);
    expect(observe).to.have.been.calledWith(['rabbits'], 'fuzzy', animals);
    expect(observe).to.have.been.calledWith(['cats'], 'furry', animals);
    expect(observe).to.have.been.calledWith(['eagles'], 'bald', animals);
    expect(observe).to.have.been.calledWith(8, 'length', animals);
  });

  it('should ignore non-enumerable properties', function() {
    Object.defineProperty(animals, 'sneaky', {
      value: ['tiger'],
      enumerable: false
    });

    forIn(observe, animals);

    expect(observe).to.have.been.calledThrice;
    expect(observe).to.have.not.been.calledWith(['tiger'], 'sneaky', animals);
  });

  it('should iterate over inherited properties', function() {
    var parent = { parent: true };
    var child = Object.create(parent, { child: { value: true, enumerable: true } });

    forIn(observe, child);

    expect(observe).to.have.been.calledTwice;
    expect(observe).to.have.been.calledWith(true, 'parent', child);
    expect(observe).to.have.been.calledWith(true, 'child', child);
  });

  it('should exit iteration early when `iterator` returns `false`', function() {
    var alwaysFalse = sinon.spy(() => false);

    forIn(alwaysFalse, animals);

    expect(alwaysFalse).to.have.been.calledOnce;
  });

  it('should throw an error when `iterator` is not a function', function() {
    expect(() => forIn('lolno', {})).to.throw();
  });
});
