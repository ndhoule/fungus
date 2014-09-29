import curry from '../function/curry';
import isFunction from './isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Iterates over an `object`'s enumerable own and inherited properties, invoking an `iterator`
 * function for each property. The `iterator` is passed three arguments: `(value, key, object)`, and
 * can end iteration early by returning `false`.
 *
 * **Note**: Order of iteration is not guaranteed across environments.
 *
 * @name forIn
 * @api public
 * @category Object
 * @see {@link forInRight}, {@link forOwn}, {@link forOwnRight}
 * @param {Function} iterator The function to call per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined} Always returns undefined.
 * @example
 * forIn(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 1, 2 (order not guaranteed across environments)
 *
 * Object.prototype.inherited = 3;
 * forIn(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 1, 2, 3 (order not guaranteed across environments)
 */
let forIn = curry(function forIn(iterator, object) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  for (let key in object) {
    if (iterator(object[key], key, object) === false) {
      break;
    }
  }
});

export default forIn;
