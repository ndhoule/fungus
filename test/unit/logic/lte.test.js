import { lte } from '../../../dist/logic/lte';

describe('lte', function() {
  it('should be a function', function() {
    expect(lte).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(lte.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(lte(1)).to.be.a('function');
    expect(lte(1)()()()).to.be.a('function');
    expect(lte(1)(2)).to.be.a('boolean');
    expect(lte(1)()()(2)).to.be.a('boolean');
  });

  it('should do what the native `>=` operator does', function() {
    expect(lte(2, 1)).to.equal(2 <= 1);
    expect(lte(2, 2)).to.equal(2 <= 2);
    expect(lte(-100, 4)).to.equal(-100 <= 4);
  });
});
