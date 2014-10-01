/**
 * Creates a new array composed of the original array's elements, with duplicates removed. Preserves
 * insertion ordering.
 *
 * @name uniq
 * @api public
 * @category Array
 * @param {Array} array The array to filter.
 * @return {Array} A new array containing only non-duplicate elements
 * @example
 * uniq(['z', 'a', 'b', 'a', 'c', 'z']);
 * //=> ['z', 'a', 'b', 'c']
 *
 * var x = {};
 * var y = [];
 * uniq(x, y, x, y);
 * //=> [x, y];
 */
let uniq = function uniq(array) {
  return Array.from(new Set(array));
};

export default uniq;
