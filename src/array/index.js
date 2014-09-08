import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import compact from './compact';
import filter from './filter';
import first from './first';
import indexOf from './indexOf';
import lastIndexOf from './lastIndexOf';
import rest from './rest';

defineAliases(['select'], filter);

export default setupAliases({
  compact: compact,
  filter: filter,
  first: first,
  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  rest: rest
});
