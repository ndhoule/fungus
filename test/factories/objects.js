chai.factory.define('objects.arguments', function() {
  return (function() { return arguments; }(1, 2, 3, 4, 5));
});
