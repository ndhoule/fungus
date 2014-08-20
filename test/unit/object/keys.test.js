import { keys } from '../../../dist/object/keys';

describe('keys', function() {
  it('should be a function', function() {
    expect(keys).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(keys.length).to.equal(1);
  });

  it('it should return a list of the object\'s keys', function() {
    expect(keys({ a: 1, b: 2, c: 3 })).to.eql(['a', 'b', 'c']);
  });

  // TODO: Test this more thoroughly once we've moved away from always using
  // Object.keys
  xit('should have more tests');
});
