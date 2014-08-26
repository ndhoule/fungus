import { isArray } from '../../../dist/object/isArray';

describe('isArray', function() {
  it('should be a function', function() {
    expect(isArray).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isArray.length).to.equal(1);
  });

  it('should return `true` when passed an array', function() {
    expect(isArray([])).to.be.true;
    expect(isArray([1, 2, 3])).to.be.true;
    expect(isArray(new Array())).to.be.true;
    expect(isArray(new Array(10))).to.be.true;
  });

  it('should return `false` when passed a non-array', function() {
    expect(isArray()).to.be.false;
    expect(isArray(undefined)).to.be.false;
    expect(isArray(null)).to.be.false;
    expect(isArray('')).to.be.false;
    expect(isArray('fdsa')).to.be.false;
    expect(isArray(new String('test'))).to.be.false;
    expect(isArray(function() {})).to.be.false;
    expect(isArray(new Function())).to.be.false;
    expect(isArray(1)).to.be.false;
    expect(isArray(new Number(1))).to.be.false;
    expect(isArray(true)).to.be.false;
    expect(isArray(false)).to.be.false;
    expect(isArray(new Boolean(true))).to.be.false;
    expect(isArray(/a/)).to.be.false;
    expect(isArray(new RegExp('a'))).to.be.false;
    expect(isArray(new Date())).to.be.false;
    expect(isArray(new Error())).to.be.false;
    expect(isArray({ test: 'omg' })).to.be.false;
    expect(isArray(new Object())).to.be.false;
  });
});
