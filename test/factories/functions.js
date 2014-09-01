chai.factory('functions', {
  add: function add(a, b) { return a + b; },

  reduce: function(fn, acc, list) { return list.reduce(fn, acc); }
});
