var lPartial = fnjs.lPartial;
var identity = fnjs.identity;

describe('lPartial', function() {
  var add;

  beforeEach(function() {
    add = sinon.spy(chai.create('functions').add);
  });

  it('should be a function', function() {
    expect(lPartial).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(lPartial.length).to.equal(1);
  });

  it('should return the original function when passed only one argument', function() {
    expect(lPartial(add)).to.equal(add);
  });

  it('should return a new function when passed arguments', function() {
    var spy = sinon.spy();
    var partialedSpy = lPartial(spy, 1);
    expect(partialedSpy).to.be.a('function');
    expect(partialedSpy).to.not.equal(spy);
  });

  it('should set the arity of the new function to the previous arity, less number of partial args', function() {
    expect(add.length).to.equal(2);

    var addOne = lPartial(add, 1);

    expect(addOne.length).to.equal(1);
  });

  it('should apply partially applied arguments to the left-hand side', function() {
    var spy = sinon.spy();
    var partialedSpy = lPartial(spy, 1, 2);

    partialedSpy(3, 4);

    expect(spy).to.have.been.calledWith(1, 2, 3, 4);
  });

  it('should throw an error if its function argument is not a function', function() {
    expect(function() { lPartial('1234'); }).to.throw();
    expect(function() { lPartial('1234', 1, 2, 3); }).to.throw();
  });
});
