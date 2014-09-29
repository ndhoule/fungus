import isNumber from '../object/isNumber';

/**
 * Private `slice` implementation.
 *
 * Note: does not do bounds checking. If passed a `to` greater than the end of
 * the array, will produce a sparse array. If passed negative `from` or `to`,
 * may throw errors or generally misbehave.
 *
 * TODO: Tests, docs
 * TODO: Remove this entirely? It's necessary to support IE < 9 (Array#slice
 * does not work on node lists in IE <= 8).
 *
 * @private
 * @param {Array|Arguments} list
 * @param {number} from
 * @param {number} to
 * @return {Array}
 */
let _slice = function _slice(list, from, to) {
  from = isNumber(from) ? from : 0;
  to = isNumber(to) ? to : list.length;

  let len = Math.max(to - from, 0);
  let i = len;
  let results = new Array(len);

  while (--i >= 0) {
    results[i] = list[from + i];
  }

  return results;
};

export default _slice;
