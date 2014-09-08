import forEach from '../collection/forEach';
import isFunction from '../object/isFunction';

var setupAliases = function(namespace) {
  forEach(function(func) {
    if (isFunction(func) && Object.prototype.hasOwnProperty.call(func, '_aliases')) {
      forEach(function(alias) {
        namespace[alias] = func;
      }, func._aliases);
    }
  }, namespace);

  return namespace;
};

export default setupAliases;
