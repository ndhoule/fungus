chai.factory('functions', {
  add: (a, b) => a + b,

  reduce: (fn, acc, list) => list.reduce(fn, acc)
});
