var add = function add(a, b) { return a + b; };

var always = function always(val) {
  return function() {
    return val;
  };
};

var eq = function eq(originalVal) {
  return function(val) { return val === originalVal; };
};

var identity = function identity(val) { return val; };

var reduce = function reduce(fn, acc, list) { return list.reduce(fn, acc); };

var truthy = function reduce(val) { return !!val; };

chai.factory.define('functions.add', function() {
  return sinon.spy(add);
});

chai.factory.define('functions.always', function(value) {
  return sinon.spy(always(value));
});

chai.factory.define('functions.eq', function() {
  return sinon.spy(eq);
});

chai.factory.define('functions.identity', function() {
  return sinon.spy(identity);
});

chai.factory.define('functions.noop', function() {
  return sinon.spy(function() {});
});

chai.factory.define('functions.truthy', function() {
  return sinon.spy(truthy);
});

chai.factory.define('functions.reduce', function() {
  return sinon.spy(reduce);
});
