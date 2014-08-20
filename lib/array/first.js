/**
 * Returns the first element from a list, or `undefined` if the list is empty.
 *
 * @category Array
 * @param {Array|String} list The list to retrieve a value from.
 * @return {*|undefined} The first element from the `list`, or `undefined` if
 * `list` is empty.
 */
export let first = function first(list) {
  return list ? list[0] : undefined;
};
