import curry from '../function/curry';
import isNumber from '../object/isNumber';

// `start` is inclusive, `end` is exclusive
var range = curry(function(start, end) {
  if (!isNumber(start)) { start = 0; }
  if (!isNumber(end)) { end = 0; }

  var length = Math.max(end - start, 0);
  var array = new Array(length);
  var i = -1;

  while (++i < length) {
    array[i] = start + i;
  }

  return array;
});

export default range;
