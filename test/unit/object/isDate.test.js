import { isDate } from '../../../dist/object/isDate';

describe('isDate', function() {
  it('should be a function', function() {
    expect(isDate).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(isDate.length).to.equal(1);
  });

  it('should return `true` when passed a date object', function() {
    expect(isDate(new Date())).to.be.true;
    expect(isDate(new Date(1409017499149))).to.be.true;
  });

  it('should return `false` when passed anything else', function() {
    expect(isDate(new Date().toString())).to.be.false;
    expect(isDate(1409017499149)).to.be.false;
    expect(isDate([])).to.be.false;
    expect(isDate([true])).to.be.false;
    expect(isDate([1, 2, 3])).to.be.false;
    expect(isDate(new Array())).to.be.false;
    expect(isDate(new Array(10))).to.be.false;
    expect(isDate('')).to.be.false;
    expect(isDate('fdsa')).to.be.false;
    expect(isDate(new String('test'))).to.be.false;
    expect(isDate({ length: 1 })).to.be.false;
    expect(isDate()).to.be.false;
    expect(isDate(undefined)).to.be.false;
    expect(isDate(null)).to.be.false;
    expect(isDate(function() {})).to.be.false;
    expect(isDate(new Function())).to.be.false;
    expect(isDate(1)).to.be.false;
    expect(isDate(new Number(1))).to.be.false;
    expect(isDate(/a/)).to.be.false;
    expect(isDate(new RegExp('a'))).to.be.false;
    expect(isDate(new Error())).to.be.false;
    expect(isDate({ test: 'omg' })).to.be.false;
    expect(isDate(new Object())).to.be.false;
    expect(isDate(true)).to.be.false;
    expect(isDate(false)).to.be.false;
    expect(isDate(new Boolean())).to.be.false;
    expect(isDate(new Boolean(true))).to.be.false;
    expect(isDate(new Boolean(false))).to.be.false;
  });
});
