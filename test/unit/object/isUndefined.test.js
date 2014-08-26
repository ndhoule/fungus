import { isUndefined } from '../../../dist/object/isUndefined';

describe('isUndefined', function() {
  it('should be a function', function() {
    expect(isUndefined).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isUndefined.length).to.equal(1);
  });

  it('should return `true` when passed undefined', function() {
    expect(isUndefined()).to.be.true;
    expect(isUndefined(undefined)).to.be.true;
    expect(isUndefined(void(0))).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isUndefined(new Date())).to.be.false;
    expect(isUndefined(1409017499149)).to.be.false;
    expect(isUndefined([])).to.be.false;
    expect(isUndefined([true])).to.be.false;
    expect(isUndefined([1, 2, 3])).to.be.false;
    expect(isUndefined(new Array())).to.be.false;
    expect(isUndefined(new Array(10))).to.be.false;
    expect(isUndefined({ length: 1 })).to.be.false;
    expect(isUndefined(function() {})).to.be.false;
    expect(isUndefined(new Function())).to.be.false;
    expect(isUndefined(1)).to.be.false;
    expect(isUndefined(new Number(1))).to.be.false;
    expect(isUndefined(null)).to.be.false;
    expect(isUndefined(new Error())).to.be.false;
    expect(isUndefined({ test: 'omg' })).to.be.false;
    expect(isUndefined(new Object())).to.be.false;
    expect(isUndefined(true)).to.be.false;
    expect(isUndefined(false)).to.be.false;
    expect(isUndefined(/a/)).to.be.false;
    expect(isUndefined('')).to.be.false;
    expect(isUndefined('fdsa')).to.be.false;
    expect(isUndefined(new String('test'))).to.be.false;
    expect(isUndefined(new RegExp())).to.be.false;
    expect(isUndefined(new RegExp('a'))).to.be.false;
    expect(isUndefined(new Boolean())).to.be.false;
    expect(isUndefined(new Boolean(true))).to.be.false;
    expect(isUndefined(new Boolean(false))).to.be.false;
  });
});
