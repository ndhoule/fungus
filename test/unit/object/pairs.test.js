import { pairs } from '../../../dist/object/pairs';

describe('pairs', function() {
  it('should be a function', function() {
    expect(pairs).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(pairs.length).to.equal(1);
  });

  it('should return a new array', function() {
    var source = { name: 'Tim', occupation: 'enchanter' };

    expect(pairs(source)).to.be.an('array');
  });

  it('should return an array containing subarrays composed of key-value pairs', function() {
    var source = { name: 'Tim', occupation: 'enchanter' };
    var result = pairs(source);
    var expected = [ ['name', 'Tim'], ['occupation', 'enchanter'] ];

    expect(result).to.have.deep.members(expected);
  });

  it('should handle objects with a `.length` property', function() {
    var source = { name: 'Tim', occupation: 'enchanter', length: 100 };
    var result = pairs(source);
    var expected = [ ['name', 'Tim'], ['occupation', 'enchanter'], ['length', 100] ];

    expect(result).to.have.length(3);
    expect(result).to.have.deep.members(expected);
  });

  it('should ignore non-enumerable properties', function() {
    var source = Object.create(null, {
      name: { value: 'Tim', enumerable: true },
      occupation: { value: 'enchanter', enumerable: true },
      secret: { value: 'Scared of rabbits', enumerable: false }
    });
    var result = pairs(source);
    var expected = [ ['name', 'Tim'], ['occupation', 'enchanter'] ];

    expect(result).to.have.length(2);
    expect(result).to.have.deep.members(expected);
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: 'parent' };
    var child = Object.create(parent);
    child.child = 'child';
    var result = pairs(child);

    expect(result).to.have.length(1);
    expect(result).to.have.deep.members([ ['child', 'child'] ]);
  });

  it('should work on string objects', function() {
    var string = new String('test');
    var result = pairs(string);
    var expected = [ ['0', 't'], ['1', 'e'], ['2', 's'], ['3', 't'] ];

    expect(result).to.have.length(4);
    expect(result).to.have.deep.members(expected);
  });

  it('should return an empty array when passed `null` or `undefined`', function() {
    expect(pairs(null)).to.eql([]);
    expect(pairs(undefined)).to.eql([]);
  });

  it('should return an empty object when passed a primitive value', function() {
    expect(pairs('test')).to.eql([]);
    expect(pairs(12)).to.eql([]);
    expect(pairs(/regex/)).to.eql([]);
  });
});
