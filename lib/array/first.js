/**
 * Retrieves the first element from a list.
 *
 * @name first
 * @api public
 * @category Array
 * @see {@link take}, {@link rest}, {@link drop}
 * @param {Array|String} list The list to retrieve a value from.
 * @return {*} The first element from the `list`.
 * @example
 * first([1, 2, 3]);
 * //=> 1
 *
 * first([]);
 * //=> undefined
 */
var first = function first(list) {
  return list ? list[0] : undefined;
};

export default first;
