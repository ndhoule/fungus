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

// Legacy factory
// TODO: Replace with individual function wrappers
chai.factory.define('functions', function() {
  return {
    add: add,
    always: always,
    eq: eq,
    identity: identity,
    reduce: reduce,
  };
});

chai.factory.define('functions.add', function() {
  return sinon.spy(add);
});

chai.factory.define('functions.always', function() {
  return sinon.spy(always);
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
