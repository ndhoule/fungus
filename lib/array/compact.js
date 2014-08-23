import { filter } from './filter';
import { truthy } from '../utility/truthy';

/**
 * Takes an array and returns a new array containing only the truthy values from
 * the input array.
 *
 * Truthiness in JavaScript is defined as any value except the following
 * values:
 *
 * - `undefined`
 * - `null`
 * - `false`
 * - `''` (empty string)
 * - `0`
 * - `NaN`
 *
 * @name compact
 * @api public
 * @category Array
 * @param {Array} array The array to examine.
 * @return {Array} A new array containing all non-falsy values from `array`.
 * @example
 * compact([8, -1, 'a', null, '', 0, {}]);
 * //=> [8, -1, 'a', {}]
 */
export let compact = filter(truthy);
