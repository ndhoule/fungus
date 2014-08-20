import { identity } from '../../../dist/utility/identity';

describe('identity', function() {
  it('should be a function', function() {
    expect(identity).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(identity.length).to.equal(1);
  });

  it('should return whatever value it was invoked with', function() {
    var obj = {};

    expect(identity(obj)).to.equal(obj);
  });

  it('should ignore additional arguments', function() {
    expect(identity(1, 2)).to.equal(1);
  });
});
