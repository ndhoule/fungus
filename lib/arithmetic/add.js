import { curry } from '../function/curry';

/**
 * TODO
 *
 * @name add
 * @api public
 * @category Arithmetic
 * @param {number} x TODO
 * @param {number} y TODO
 * @return {number} TODO
 * @example
 * TODO
 */
export let add = curry(function add(x, y) {
  return x + y;
});
