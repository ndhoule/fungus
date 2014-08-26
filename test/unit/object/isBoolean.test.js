import { isBoolean } from '../../../dist/object/isBoolean';

describe('isBoolean', function() {
  it('should be a function', function() {
    expect(isBoolean).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isBoolean.length).to.equal(1);
  });

  it('should return `true` when passed a boolean', function() {
    expect(isBoolean(true)).to.be.true;
    expect(isBoolean(false)).to.be.true;
    expect(isBoolean(new Boolean())).to.be.true;
    expect(isBoolean(new Boolean(true))).to.be.true;
    expect(isBoolean(new Boolean(false))).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isBoolean([])).to.be.false;
    expect(isBoolean([true])).to.be.false;
    expect(isBoolean([1, 2, 3])).to.be.false;
    expect(isBoolean(new Array())).to.be.false;
    expect(isBoolean(new Array(10))).to.be.false;
    expect(isBoolean('')).to.be.false;
    expect(isBoolean('fdsa')).to.be.false;
    expect(isBoolean(new String('test'))).to.be.false;
    expect(isBoolean({ length: 1 })).to.be.false;
    expect(isBoolean()).to.be.false;
    expect(isBoolean(undefined)).to.be.false;
    expect(isBoolean(null)).to.be.false;
    expect(isBoolean(function() {})).to.be.false;
    expect(isBoolean(new Function())).to.be.false;
    expect(isBoolean(1)).to.be.false;
    expect(isBoolean(new Number(1))).to.be.false;
    expect(isBoolean(/a/)).to.be.false;
    expect(isBoolean(new RegExp('a'))).to.be.false;
    expect(isBoolean(new Date())).to.be.false;
    expect(isBoolean(new Error())).to.be.false;
    expect(isBoolean({ test: 'omg' })).to.be.false;
    expect(isBoolean(new Object())).to.be.false;
  });
});
