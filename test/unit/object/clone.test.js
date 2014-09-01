var clone = fungus.clone;

describe('clone', function() {
  it('should be a function', function() {
    expect(clone).to.be.a('function');
  });

  it('should have an arity of 1', function() {
    expect(clone.length).to.equal(1);
  });

  it('should work on arrays', function() {
    var numbers = [1, 2, 3];
    var cloned = clone(numbers);

    expect(cloned).to.eql(numbers);
    expect(cloned).to.not.equal(numbers);
  });

  it('should work on objects', function() {
    var names = { bob: 'smith', tim: 'the enchanter' };
    var cloned = clone(names);

    expect(cloned).to.eql(names);
    expect(cloned).to.not.equal(names);
  });

  it('should perform a shallow copy', function() {
    var parent = { child: { grandchild: { value: 1 } } };
    var cloned = clone(parent);

    expect(cloned).to.have.property('child');
    expect(cloned).to.have.deep.property('child.grandchild');
    expect(cloned.child).to.equal(parent.child);
    expect(cloned.child.grandchild).to.equal(parent.child.grandchild);
    expect(cloned.child.grandchild.value).to.equal(1);
  });

  it('should ignore inherited properties', function() {
    var parent = { parent: true };
    var child = Object.create(parent);
    child.child = true;
    var cloned = clone(child);

    expect(cloned).to.have.property('child');
    expect(cloned).to.not.have.property('parent');
  });

  it('should handle primitive values', function() {
    expect(clone('spam')).to.equal('spam');
    expect(clone(0)).to.equal(0);
    expect(clone(3)).to.equal(3);
    expect(clone(NaN)).to.satisfy(isNaN);
    expect(clone(null)).to.be.null;
    expect(clone(true)).to.be.true;
    expect(clone(false)).to.be.false;
    expect(clone(undefined)).to.be.undefined;
    expect(clone(Infinity)).to.equal(Infinity);
  });

  it('should pass functions through unmodified', function() {
    var fn = function() {};
    var cloned = clone(fn);

    expect(cloned).to.equal(fn);
  });

  /**
   * TODO
   *
   * Ideally, `clone()` would eventually support cloning Dates, primitive object types, etc. These
   * tests are a start down that road.
   */

  // xit('should handle arguments objects', function() {
  //   var args = (function() { return arguments; }(1, 2, 3));
  //   var cloned = clone(args);
  //
  //   expect(cloned).to.be.an('object');
  //   expect(cloned).to.eql({ '0': 1, '1': 2, '2': 3 });
  //   expect(cloned).to.not.equal(args);
  // });

  // xit('should handle date objects', function() {
  //   var date = new Date();
  //   var cloned = clone(date);
  //
  //   expect(cloned).to.be.a('date');
  //   expect(cloned).to.eql(date);
  //   expect(cloned).to.not.equal(date);
  // });

  // xit('should handle number objects', function() {
  //   var number = new Number(11);
  //   var cloned = clone(number);
  //
  //   expect(cloned).to.be.a('number');
  //   expect(cloned).to.eql(number);
  //   expect(cloned).to.not.equal(number);
  // });

  // xit('should handle string objects', function() {
  //   var string = new String('spam');
  //   var cloned = clone(string);
  //
  //   expect(cloned).to.be.a('string');
  //   expect(cloned).to.eql(string);
  //   expect(cloned).to.not.equal(string);
  // });

  // xit('should handle primitives wrapped in objects that have had their constructor value changed', function() {
  //   var string = new String('bacon');
  //   Object.defineProperty(string, 'constructor', {
  //     value: Number,
  //     enumerable: false
  //   });
  //
  //   expect(clone(string)).to.be.a('string');
  // });

  // xit('should handle class instances', function() {
  //   var Ctor = function() {
  //     this.bacon = 'mmm';
  //   };
  //   var instance = new Ctor();
  //   var cloned = clone(instance);
  //
  //   expect(cloned).to.be.an('object');
  //   expect(cloned).to.have.property('bacon');
  //   expect(cloned).to.not.be.an.instanceof(Ctor);
  // });

  // xit('should handle subclassed instances', function() {
  //   var Parent = function() {
  //     this.parent = true;
  //   };
  //   var Child = function() {
  //     Parent.apply(this);
  //     this.parent = false;
  //     this.child = true;
  //   };
  //   Child.prototype = Object.create(Parent.prototype);
  //   Object.defineProperty(Child.prototype, 'constructor', { value: Parent, enumerable: false });
  //
  //   var child = new Child();
  //   var cloned = clone(child);
  //
  //   expect(cloned).to.be.an('object');
  //   console.log(cloned instanceof Child)
  //   console.log(cloned instanceof Parent)
  //   expect(cloned).to.not.be.an.instanceof(Child);
  //   expect(cloned).to.not.be.an.instanceof(Parent);
  // });

  // var possibleHostObjects = [
  //   'Array',
  //   'ArrayBuffer',
  //   'Boolean',
  //   'DataView',
  //   'Date',
  //   'Error',
  //   'EvalError',
  //   'Float32Array',
  //   'Float64Array',
  //   'Function',
  //   'Generator',
  //   'Int16Array',
  //   'Int32Array',
  //   'Int8Array',
  //   'Intl',
  //   'Iterator',
  //   'Number',
  //   'Object',
  //   'ParallelArray',
  //   'Promise',
  //   'Proxy',
  //   'RangeError',
  //   'ReferenceError',
  //   //'Reflect',
  //   'RegExp',
  //   'String',
  //   'SyntaxError',
  //   'TypeError',
  //   'URIError',
  //   'Uint16Array',
  //   'Uint32Array',
  //   'Uint8Array',
  //   'Uint8ClampedArray'
  // ];

  // var hostObjects = {};

  // for (var i = 0; i < possibleHostObjects.length; i += 1) {
  //   var name = possibleHostObjects[i];
  //   var hostObject = this[name];
  //
  //   if (hostObject) {
  //     hostObjects[name] = hostObject;
  //   }
  // }

  // chai.factory('hostObjects', hostObjects);

  // // Generate tests for host objects
  // forEach(function(HostObject, name) {
  //   xit('should handle the ' + name + ' host object', function() {
  //     new Function('clone', 'obj', 'expect(clone(obj)).to.equal(obj);')(clone, HostObject);
  //   });
  // }, chai.create('hostObjects'));
});
