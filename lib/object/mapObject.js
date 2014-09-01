import curry from '../function/curry';
import isFunction from '../object/isFunction';
import keys from './keys';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Iterates over an object's own enumerable properties, invoking a transformer `iterator` function
 * for each value in the object and returning a new, transformed object.
 *
 * @name mapObject
 * @api public
 * @see {@link map}
 * @param {Function} iterator The function to call per iteration.
 * @param {Object} object The object to iterate over.
 * @return {Object} A new object, composed of the same keys as `object` whose values are the result
 * of running `iterator` over the value at that key.
 * @example
 * var add100 = function(val) { return val + 100; };
 *
 * mapObject({ a: 1, b: 2, c: 3 }, add100);
 * //=> { a: 101, b: 102, c: 103 }
 */
let mapObject = curry(function mapObject(iterator, object) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  let result = {};
  let ks = keys(object);
  let i = ks.length;

  while (--i >= 0) {
    result[ks[i]] = iterator(object[ks[i]], ks[i], object);
  }

  return result;
});

export default mapObject;
