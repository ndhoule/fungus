chai.factory.define('objects.arguments', function() {
  return (function() { return arguments; }(1, 2, 3, 4, 5));
});

chai.factory.define('objects.child', function() {
  var parent = { parent: true, inherited: false };
  var child = Object.create(parent, {
    child: { value: true, enumerable: true }
  });

  return child;
});

chai.factory.define('objects.nonenumerable', function() {
  return Object.create({}, {
    exposed: { value: true, enumerable: true },
    hidden: { value: true, enumerable: false }
  });
});

chai.factory.define('objects.customLength', function() {
  return {
    a: 1,
    b: true,
    c: null,
    actualLength: 5,
    length: 10
  };
});
