import add from '../arithmetic/add';
import foldl from '../collection/foldl';

/**
 * Sums up the contents of an array.
 *
 * @name sum
 * @api public
 * @category Math
 * @param {Array} numbers The numbers to sum.
 * @return {number} The result of summing the contents of `numbers` together.
 * @example
 * sum([1, 2, 3]);
 * //=> 6
 */
let sum = foldl(add, 0);

export default sum;
