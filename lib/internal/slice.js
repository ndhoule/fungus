import isNumber from '../object/isNumber';

/**
 * Optimized private `slice` implementation.
 *
 * Note: does not do bounds checking. If passed a `to` greater than the end of
 * the array, will produce a sparse array. If passed negative `from` or `to`,
 * may throw errors or generally misbehave.
 *
 * TODO: Tests, docs
 *
 * @private
 * @param {Array|Arguments} list
 * @param {number} from
 * @param {number} to
 * @return {Array}
 */
var _slice = function _slice(list, from, to) {
  from = isNumber(from) ? from : 0;
  to = isNumber(to) ? to : list.length;

  var i = -1;
  var len = Math.max(to - from, 0);
  var results = new Array(len);

  while (++i < len) {
    results[i] = list[from + i];
  }

  return results;
};

export default _slice;
