import keys from './keys';

/**
 * Returns an array containing all enumerable values from a `target` object.
 *
 * @name values
 * @api public
 * @category Object
 * @param {Object} target The object to retrieve values from.
 * @return {Array} An array of all the `target` object's values.
 * @example
 * values({ a: 1, b: 2, c: 3 });
 * //=> [1, 2, 3]
 */
let values = function values(target) {
  let ks = keys(target);
  let length = ks.length;
  let results = new Array(length);
  let i = length;

  while (--i >= 0) {
    results[i] = target[ks[i]];
  }

  return results;
};

export default values;
