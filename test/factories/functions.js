chai.factory.define('functions', function() {
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

  return {
    add: add,
    always: always,
    eq: eq,
    identity: identity,
    reduce: reduce,
  };
});
