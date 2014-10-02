import compose from './compose';

/**
 * Creates a function that is the [composition](https://en.wikipedia.org/wiki/Function_composition)
 * of a list of functions, where each function is passed the return value of the previous function.
 *
 * Pipe is left-associative, which means functions are called in left-to-right order. For
 * example, the operation `h(g(f()))` is represented as `pipe(f, g, h)`.
 *
 * @name pipe
 * @api public
 * @category Function
 * @see {@link compose}
 * @param {...Function} fns The functions to compose into a single function.
 * @return {Function} Returns a new function which, when called, will invoke each input function in
 * left-to-right order and return the result of the final function call.
 * @example
 * var add = function(a, b) { return a + b; };
 * var square = function(a, b) { return a + b; };
 *
 * var addThenSquare = pipe(add, square);
 *
 * addThenSquare(1, 2);
 * //=> 9
 */
let pipe = function pipe(...fns) {
  return compose.apply(this, fns.reverse());
};

export default pipe;
