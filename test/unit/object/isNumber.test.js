import { isNumber } from '../../../dist/object/isNumber';

describe('isNumber', function() {
  it('should be a function', function() {
    expect(isNumber).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isNumber.length).to.equal(1);
  });

  it('should return `true` when passed a number', function() {
    expect(isNumber(0)).to.be.true;
    expect(isNumber(1)).to.be.true;
    expect(isNumber(-1)).to.be.true;
    expect(isNumber(new Number())).to.be.true;
    expect(isNumber(new Number(1))).to.be.true;
  });

  it('should return `false` when passed a non-number', function() {
    expect(isNumber()).to.be.false;
    expect(isNumber(undefined)).to.be.false;
    expect(isNumber(null)).to.be.false;
    expect(isNumber('')).to.be.false;
    expect(isNumber('0')).to.be.false;
    expect(isNumber('100')).to.be.false;
    expect(isNumber('fdsa')).to.be.false;
    expect(isNumber(new String('test'))).to.be.false;
    expect(isNumber(true)).to.be.false;
    expect(isNumber(false)).to.be.false;
    expect(isNumber(new Boolean(true))).to.be.false;
    expect(isNumber(/a/)).to.be.false;
    expect(isNumber(new RegExp('a'))).to.be.false;
    expect(isNumber(new Date())).to.be.false;
    expect(isNumber(new Error())).to.be.false;
    expect(isNumber({ test: 'omg' })).to.be.false;
    expect(isNumber(new Object())).to.be.false;
    expect(isNumber([])).to.be.false;
    expect(isNumber([1, 2, 3])).to.be.false;
  });
});
