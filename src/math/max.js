import foldl from '../collection/foldl';
import wrap from '../function/wrap';
import identity from '../utility/identity';

var createComparator = wrap(function(callback, a, b) {
  return callback(a) >= callback(b) ? a : b;
});

/**
 * Returns the largest element in a collection. Takes an optional `callback` argument, which `max`
 * will use to retrieve the value to be compared from each element in the `collection`.
 *
 * @name max
 * @api public
 * @category Math
 * @see {@link min}
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [callback=identity] A callback to invoke for each element in the collection.
 * The callback receives one argument, an element from the collection, and should return a number.
 * @return {*} The maximum value in the collection, or `-Infinity` if the list is empty.
 * @example
 * max([5, 3, 9]);
 * //=> 9
 *
 * max({ a: 7, b: 1, c: 6 });
 * //=> 7
 *
 * var people = [
 *   { name: 'Albert', age: 53 },
 *   { name: 'Tim', age: 600 },
 *   { name: 'Thomas', age: 31 }
 * ];
 * max(people, function(person) { return person.age; });
 * //=> { name: 'Tim', age: 600 }
 */
var max = function max(collection, callback = identity) {
  return foldl(createComparator(callback), -Infinity, collection);
};

export default max;
