import isArrayLike from '../object/isArrayLike';
import keys from '../object/keys';

/**
 * Gets the size of the `collection`.
 *
 * @name size
 * @api public
 * @category Collection
 * @param {Object|Array|string} collection The collection to examine.
 * @return {number} The size of the collection. If the `length` property is defined and is numeric,
 * it is returned; otherwise, returns the number of own enumerable keys on the collection.
 * @example
 * size(['a', 'b', 'c']);
 * //=> 3
 *
 * size({ a: true, b: true, c: false });
 * //=> 3
 *
 * // When present, uses the `length` property
 * size({ length: 10 });
 * //=> 10
 *
 * // Ignores inherited properties when determining size
 * var parent = { a: 1, b: 2, c: 3 };
 * var child = Object.create(parent);
 * child.d = true;
 * size(child);
 * //=> 1
 */
let size = collection => isArrayLike(collection) ? collection.length : keys(collection).length;

export default size;
