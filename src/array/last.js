/**
 * Retrieves the last element from a list.
 *
 * @name last
 * @api public
 * @category Array
 * @see {@link first}
 * @param {Array|String} list The list to retrieve a value from.
 * @return {*} The last element from the `list`.
 * @example
 * last([1, 2, 3]);
 * //=> 3
 *
 * last([]);
 * //=> undefined
 */
let last = function(array) {
  let length = array ? array.length : 0;

  return length ? array[length - 1] : undefined;
};

export default last;
