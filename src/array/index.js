import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import compact from './compact';
import filter from './filter';
import first from './first';
import indexOf from './indexOf';
import last from './last';
import lastIndexOf from './lastIndexOf';
import range from './range';
import rest from './rest';
import uniq from './uniq';

defineAliases(['select'], filter);

export default setupAliases({
  compact,
  filter,
  first,
  indexOf,
  last,
  lastIndexOf,
  range,
  rest,
  uniq
});
