var pick = fungus.pick;

describe('pick', function() {
  it('should be a function', function() {
    expect(pick).to.be.a('function');
  });

  it('should have an arity of 2', function() {
    expect(pick.length).to.equal(2);
  });

  it('should be curried', function() {
    expect(pick('tim')).to.be.a('function');
    expect(pick('tim')()()()).to.be.a('function');
    expect(pick(['tim'])()()()).to.be.a('function');
    expect(pick('tim')({})).to.be.an('object');
    expect(pick(['tim'])({})).to.be.an('object');
    expect(pick('tim')()()({})).to.be.an('object');
  });

  it('should return a new object', function() {
    var source = { name: 'tim' };
    var result = pick('name', source);

    expect(result).to.be.an('object');
    expect(result).to.not.equal(source);
  });

  it('should return an object including only the specified `keep` property', function() {
    var source = { name: 'tim', occupation: 'enchanter' };
    var expected = { name: 'tim' };

    expect(pick('name', source)).to.eql(expected);
  });

  it('should return an object including only the specified `keep` properties', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };
    var expected = { name: 'tim', scaredOf: 'rabbits' };

    expect(pick(['name', 'scaredOf'], source)).to.eql(expected);
  });

  it('should handle properties that don\'t exist on the target `object`', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };

    expect(pick('nonexistent', source)).to.eql({});
    expect(pick(['name', 'keys'], source)).to.eql({ name: 'tim' });
  });

  it('should handle an empty list of `props`', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };

    expect(pick([], source)).to.eql({});
  });

  it('should ignore non-string omissions', function() {
    var source = { name: 'tim', null: 'enchanter', undefined: 'rabbits' };

    expect(pick(null, source)).to.eql({});
    expect(pick([null, undefined], source)).to.eql({});
    expect(pick([null, 'name', undefined], source)).to.eql({ name: 'tim' });
  });

  it('should handle non-array/string `omissions` arguments', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits' };

    expect(pick(null, source)).to.eql({});
    expect(pick(undefined, source)).to.eql({});
    expect(pick(/name/, source)).to.eql({});
    expect(pick(Error, source)).to.eql({});
  });

  it('should handle objects with a `.length` property', function() {
    var source = { name: 'tim', occupation: 'enchanter', scaredOf: 'rabbits', length: 100 };
    var expected = { name: 'tim', scaredOf: 'rabbits', length: 100 };

    expect(pick(['name', 'scaredOf', 'length'], source)).to.eql(expected);
  });

  it('should not ignore non-enumerable properties', function() {
    var source = Object.create(null, {
      name: { value: 'tim', enumerable: true },
      occupation: { value: 'enchanter', enumerable: true },
      scaredOf: { value: 'rabbits', enumerable: false }
    });

    expect(pick('scaredOf', source)).to.have.property('scaredOf');
  });

  it('should not ignore inherited properties', function() {
    var parent = { parent: 'parent' };
    var child = Object.create(parent);
    child.child = 'child';
    child.color = 'green';

    expect(pick('parent', child)).to.have.property('parent');
  });

  it('should work on non-plain objects', function() {
    var string = new String('test');
    var result = pick(['0', '1'], string);
    var expected = { '0': 't', '1': 'e' };

    expect(result).to.be.an('object');
    expect(result).to.eql(expected);
    expect(result).to.not.equal(string);
  });

  it('should handle `null` and `undefined` as the `object` parameter', function() {
    expect(pick('whatever', null)).to.eql({});
    expect(pick('whatever', undefined)).to.eql({});
  });

  it('should return an empty object when passed a primitive value', function() {
    expect(pick('whatever', 'test')).to.eql({});
    expect(pick('whatever', 12)).to.eql({});
    expect(pick('whatever', /regex/)).to.eql({});
  });
});
