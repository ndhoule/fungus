import curry from '../function/curry';
import isNumber from '../object/isNumber';

// `start` is inclusive, `end` is exclusive
let range = curry(function(start, end) {
  if (!isNumber(start)) { start = 0; }
  if (!isNumber(end)) { end = 0; }

  let length = Math.max(end - start, 0);
  let array = new Array(length);
  let i = -1;

  while (++i < length) {
    array[i] = start + i;
  }

  return array;
});

export default range;
