import { lt } from '../../../dist/logic/lt';

describe('lt', function() {
  it('should be a function', function() {
    expect(lt).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(lt.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(lt(1)).to.be.a('function');
    expect(lt(1)()()()).to.be.a('function');
    expect(lt(1)(2)).to.be.a('boolean');
    expect(lt(1)()()(2)).to.be.a('boolean');
  });

  it('should do what the native `<` operator does', function() {
    expect(lt(2, 1)).to.equal(2 < 1);
    expect(lt(-100, 4)).to.equal(-100 < 4);
  });
});
