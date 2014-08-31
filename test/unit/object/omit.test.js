import { identity } from '../../../dist/utility/identity';
import { omit } from '../../../dist/object/omit';

describe('omit', function() {
  var observe;

  beforeEach(function() {
    observe = sinon.spy(identity);
  });

  it('should be a function', function() {
    expect(omit).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(omit.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(omit('tim')).to.be.a('function');
    expect(omit('tim')()()()).to.be.a('function');
    expect(omit(['tim'])()()()).to.be.a('function');
    expect(omit('tim')({})).to.be.an('object');
    expect(omit(['tim'])({})).to.be.an('object');
    expect(omit('tim')()()({})).to.be.an('object');
  });

  it('should return a new object', function() {
    var source = { name: 'tim' };
    var result = omit('name', source);

    expect(result).to.be.an('object');
    expect(result).to.not.equal(source);
  });

  it('should return an object, omitting the named `omission` property', function() {
    var source = { name: 'tim', occupation: 'enchanter' };
    var expected = { name: 'tim' };

    expect(omit('occupation', source)).to.eql(expected);
  });

  it('should return an object, omitting any of the named `omissions` properties', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };
    var expected = { occupation: 'enchanter' };

    expect(omit(['name', 'scaredOf'], source)).to.eql(expected);
  });

  it('should handle omissions that don\'t exist on the target `object`', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };

    expect(omit('nonexistent', source)).to.eql(source);
    expect(omit(['nonexistent', 'keys'], source)).to.eql(source);
  });

  it('should handle an empty list of `omissions`', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };

    expect(omit([], source)).to.eql(source);
  });

  it('should ignore non-string omissions', function() {
    var source = { name: 'tim', null: 'enchanter', undefined: 'rabbits' };

    expect(omit(null, source)).to.eql(source);
    expect(omit([null, undefined], source)).to.eql(source);
  });

  it('should handle non-array/string `omissions` arguments', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };

    expect(omit(null, source)).to.eql(source);
    expect(omit(undefined, source)).to.eql(source);
    expect(omit(/name/, source)).to.eql(source);
    expect(omit(Error, source)).to.eql(source);
  });

  it('should handle objects with a `.length` property', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits', length: 100 };
    var expected = { occupation: 'enchanter', length: 100 };

    expect(omit(['name', 'scaredOf'], source)).to.eql(expected);
  });

  it('should ignore non-enumerable properties', function() {
    var source = Object.create(null, {
      name: { value: 'tim', enumerable: true },
      occupation: { value: 'enchanter', enumerable: true },
      scaredOf: { value: 'rabbits', enumerable: false }
    });

    expect(omit('occupation', source)).to.not.have.property('scaredOf');
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: 'parent' };
    var child = { child: 'child', color: 'green' };

    expect(omit('color', child).parent).to.be.undefined;
  });

  it('should work on non-plain objects', function() {
    var string = new String('test');
    var result = omit('0', string);
    var expected = { '1': 'e', '2': 's', '3': 't' };

    expect(result).to.be.an('object');
    expect(result).to.eql(expected);
    expect(result).to.not.equal(string);
  });

  it('should handle `null` and `undefined` as the `object` parameter', function() {
    expect(omit('whatever', null)).to.eql({});
    expect(omit('whatever', undefined)).to.eql({});
  });

  it('should return an empty object when passed a primitive value', function() {
    expect(omit('whatever', 'test')).to.eql({});
    expect(omit('whatever', 12)).to.eql({});
    expect(omit('whatever', /regex/)).to.eql({});
  });
});
