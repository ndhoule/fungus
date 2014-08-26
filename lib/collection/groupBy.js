import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { existy } from '../utility/existy';
import { foldl } from './foldl';
import { get } from '../utility/get';
import { identity } from '../utility/identity';
import { isFunction } from '../object/isFunction';

let hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Returns an object where the keys are the result of running a collection's values through an
 * `aggregator` function, and the values are an array of values which returned that key when run
 * through the aggregator function.
 *
 * @name groupBy
 * @api public
 * @category Collection
 * @param {Function|String} aggregator The function to call per iteration. Passed a single argument,
 * the current `value` in the array. If a string is provided, it will be used as a property
 * accessor.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {Object} The aggregate object.
 * @example
 * var evenOrOdd = function(num) { return num % 2 === 0 ? 'even' : 'odd'; };
 *
 * groupBy(evenOrOdd, [1, 2, 3, 4]);
 * //=> { 'even': [2, 4], 'odd': [1, 3] }
 *
 * var names = { stephen: 'hawking', albert: 'einstein', isaac: 'newton' };
 * groupBy(function(val) { return val[0]; }, names);
 * //=> { e: ['einstein'], h: ['hawking'], n: ['newton'] }
 */
export let groupBy = curry(function(aggregator, collection) {
  if (!isFunction(aggregator)) {
    aggregator = existy(aggregator) ? get(aggregator) : identity;
  }

  return foldl(function(result, value, key) {
    let aggregateKey = aggregator(value);

    hasOwnProperty.call(result, aggregateKey)
      ? result[aggregateKey].push(value)
      : result[aggregateKey] = [value];

    return result;
  }, {}, collection);
});
