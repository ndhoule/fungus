import { subtract } from '../../../dist/arithmetic/subtract';

describe('subtract', function() {
  it('should be a function', function() {
    expect(subtract).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(subtract.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(subtract(1)).to.be.a('function');
    expect(subtract(1)()()()).to.be.a('function');
    expect(subtract(1)(2)).to.be.a('number');
    expect(subtract(1)()()(2)).to.be.a('number');
  });

  it('should do what the native `-` operator does', function() {
    expect(subtract(1, 2)).to.equal(1 - 2);
    expect(subtract(-1, 2)).to.equal(-1 - 2);
  });
});
