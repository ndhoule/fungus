import curry from '../function/curry';
import isFunction from './isFunction';
import keys from './keys';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Iterates over an `object`'s enumerable own properties, invoking an `iterator` function for each
 * property. The `iterator` is passed three arguments: `(value, key, object)`, and can end iteration
 * early by returning `false`.
 *
 * **Note**: Order of iteration is not guaranteed across environments.
 *
 * @name forOwn
 * @api public
 * @category Object
 * @see {@link forOwnRight}, {@link forIn}, {@link forInRight}
 * @param {Function} iterator The function to call per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined} Always returns undefined.
 * @example
 * forOwn(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 1, 2 (order not guaranteed across environments)
 *
 * Object.prototype.inherited = 3;
 * forOwn(function(value) { console.log(value); }, { a: 1, b: 2 });
 * //-> 1, 2 (order not guaranteed across environments)
 */
var forOwn = curry(function forOwn(iterator, object) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  var ks = keys(object);
  var i = -1;

  while (++i < ks.length) {
    if (iterator(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
});

export default forOwn;
