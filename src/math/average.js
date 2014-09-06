import keys from '../object/keys';
import sum from './sum';

/**
 * Returns the average of all numbers in a collection.
 *
 * @name average
 * @api public
 * @category Math
 * @param {Array|Object} collection The collection to iterate over.
 * @return {number} The average of all elements in a collection.
 * @example
 * average([1, 2, 3]);
 * //=> 2
 *
 * average({ a: 1, b: 2, c: 3 });
 * //=> 2
 */
var average = function average(collection) {
  return sum(collection) / keys(collection).length;
};

export default average;
