/**
 * Adds two numbers together.
 */
var add = function add(a, b) { return a + b; };

chai.factory.define('functions.add', function() {
  return sinon.spy(add);
});

/**
 * Returns the same value every time it's invoked.
 */
var always = function always(val) {
  return function() {
    return val;
  };
};

chai.factory.define('functions.always', function() {
  return sinon.spy(always);
});

/**
 * Determines whether or not two elements are equal using strict equality.
 */
var eq = function eq(originalVal) {
  return function(val) { return val === originalVal; };
};

chai.factory.define('functions.eq', function() {
  return sinon.spy(eq);
});

/**
 * Returns whatever is passed to it.
 */
var identity = function identity(val) { return val; };

chai.factory.define('functions.identity', function() {
  return sinon.spy(identity);
});

/**
 * Does nothing (no operation).
 */
var noop = function() {};

chai.factory.define('functions.noop', function() {
  return sinon.spy(noop);
});

/**
 * Predicate function that returns true if the value is truthy.
 */
var truthy = function reduce(val) { return !!val; };

chai.factory.define('functions.truthy', function() {
  return sinon.spy(truthy);
});

/**
 * Wrapper for `reduce`.
 */
var reduce = function reduce(fn, acc, list) { return list.reduce(fn, acc); };

chai.factory.define('functions.reduce', function() {
  return sinon.spy(reduce);
});
