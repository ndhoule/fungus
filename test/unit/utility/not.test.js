import { NOT_FUNC_EXCEPTION } from '../../../dist/internal/exceptions';
import { not } from '../../../dist/utility/not';

describe('not', function() {
  var alwaysTrue, alwaysFalse, alwaysEmptyString, always1;

  beforeEach(function() {
    alwaysTrue = sinon.spy(() => true);
    alwaysFalse = sinon.spy(() => false);
    alwaysEmptyString = sinon.spy(() => '');
    always1 = sinon.spy(() => 1);
  });

  it('should be a function', function() {
    expect(not).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(not.length).to.equal(1);
  });

  it('should return a new, wrapper function', function() {
    var fn = not(alwaysTrue);

    expect(fn).to.be.a('function');
    expect(fn).to.not.equal(not);
    expect(fn).to.not.equal(alwaysTrue);
  });

  it('should produce a new function that, when called, invokes the wrapped function', function() {
    var fn = not(always1);

    fn(4, 3, 2, 1);

    expect(always1).to.have.been.calledOnce;

    fn(4, 3, 2, 1);

    expect(always1).to.have.been.calledTwice;
  });

  it('should set the returned function\'s arity to that of the input function', function() {
    var triplet = function(a, b, c) {
      return [a, b, c];
    };

    expect(triplet.length).to.equal(3);
    expect(not(triplet).length).to.equal(3);
  });

  it('should pass all arguments through to the wrapped function', function() {
    not(always1)(4, 3, 2, 1);

    expect(always1).to.have.been.calledWith(4, 3, 2, 1);
  });

  it('should return the opposite of `fn`\'s return value', function() {
    expect(not(alwaysTrue)()).to.be.false;
    expect(not(alwaysFalse)()).to.be.true;
  });

  it('should always return a boolean, regardless of `fn`\'s return value', function() {
    expect(not(alwaysEmptyString)()).to.be.true;
    expect(not(always1)()).to.be.false;
  });

  it('should throw an error when passed no arguments', function() {
    expect(() => not()).to.throw(NOT_FUNC_EXCEPTION);
  });

  it('should throw an error when passed a non-function as its argument', function() {
    expect(() => not('fdsa')).to.throw(NOT_FUNC_EXCEPTION);
    expect(() => not(123)).to.throw(NOT_FUNC_EXCEPTION);
  });
});
