import curry from '../function/curry';
import existy from './existy';

/**
 * Retrieves the value stored at a specified `key` on the `target`. A functional replacement for the
 * `.` operator.
 *
 * @name get
 * @api public
 * @category Utility
 * @alias dot
 * @param {string} key The key to use.
 * @param {Object} target The target object to search.
 * @return {*|undefined} The value located at `key` on `target`, or `undefined`
 * if not found.
 * @example
 * get('food', { food: 'spam' });
 * //=> 'spam'
 *
 * get('nonexistent', { food: 'spam' });
 * //=> undefined
 *
 * // Doesn't throw errors if the target doesn't exist
 * get('nonexistent', undefined);
 * //=> undefined
 * get('nonexistent', null);
 * //=> undefined
 */
var get = curry(function get(key, target) {
  return existy(target) ? target[key] : undefined;
});

export default get;
