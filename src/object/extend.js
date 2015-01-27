let has = Object.prototype.hasOwnProperty;

/**
 * Copy the properties of one or more `objects` onto a new object. Input objects are iterated over
 * in left-to-right order, so duplicate properties on later objects will overwrite those from
 * erevious ones. Only enumerable and own properties of the input objects are copied onto the
 * resulting object.
 *
 * Note that unlike many implementations of `extend`, this implementation intentionally does not
 * mutate its first argument; instead, it returns an entirely new object.
 *
 * @name extend
 * @api public
 * @category Object
 * @param {...Object} objects The source objects.
 * @return {Object} TODO
 * @example
 * var obj = { a: 'a' };
 * var obj2 = { b: 'b' };
 *
 * extend(obj, obj2);
 * //=> { a: 'a', b: 'b' };
 *
 * // Note that `obj` remains unchanged
 * console.log(obj);
 * //-> { a: 'a' }
 */
let extend = function extend(...objects) {
  let target = {};

  for (let i = 0; i < objects.length; i += 1) {
    for (let key in objects[i]) {
      if (has.call(objects[i], key)) {
        target[key] = objects[i][key];
      }
    }
  }

  return target;
};

export default extend;
