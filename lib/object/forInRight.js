import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { isFunction } from './isFunction';

/**
 * Iterates over an `object`'s enumerable own and inherited properties in reverse order, invoking an
 * `iterator` function for each property. The `iterator` is passed three arguments:
 * `(value, key, object)`, and can end iteration early by returning `false`.
 *
 * **Note**: Order of iteration is not guaranteed across environments.
 *
 * @name forInRight
 * @api public
 * @category Object
 * @see {@link forIn}, {@link forOwn}, {@link forOwnRight}
 * @param {Function} iterator The function to call per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined} Always returns undefined.
 * @example
 * forInRight(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 2, 1 (order not guaranteed across environments)
 *
 * Object.prototype.inherited = 3;
 * forInRight(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 3, 2, 1 (order not guaranteed across environments)
 */
export let forInRight = curry(function forInRight(iterator, object) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  let ks = [];

  for (let key in object) {
    ks.push(key);
  }

  let i = ks.length;

  while (--i >= 0) {
    if (iterator(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
});
