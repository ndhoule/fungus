import { filter } from './filter';
import { truthy } from '../utility/truthy';

/**
 * Takes an array and returns a new array containing only the truthy values from
 * the input array.
 *
 * Truthiness in JavaScript is defined as any value except the following
 * values:
 *
 * - undefined
 * - null
 * - false
 * - '' (empty string)
 * - 0
 * - NaN
 *
 * @param {Array} array The array to examine.
 * @return {Array} An array with all falsy values from `array` removed.
 */
export let compact = filter(truthy);
