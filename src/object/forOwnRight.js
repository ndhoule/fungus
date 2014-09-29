import curry from '../function/curry';
import isFunction from './isFunction';
import keys from './keys';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Iterates over an `object`'s enumerable own properties in reverse order, invoking an `iterator`
 * function for each property. The `iterator` is passed three arguments: `(value, key, object)`, and
 * can end iteration early by returning `false`.
 *
 * **Note**: Order of iteration is not guaranteed across environments.
 *
 * @name forOwnRight
 * @api public
 * @category Object
 * @see {@link forOwn}, {@link forIn}, {@link forInRight}
 * @param {Function} iterator The function to call per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined} Always returns undefined.
 * @example
 * forOwnRight(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 2, 1 (order not guaranteed across environments)
 *
 * Object.prototype.inherited = 3;
 * forOwnRight(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 2, 1 (order not guaranteed across environments)
 */
let forOwnRight = curry(function forOwnRight(iterator, object) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  let ks = keys(object);
  let i = ks.length;

  while (--i >= 0) {
    if (iterator(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
});

export default forOwnRight;
