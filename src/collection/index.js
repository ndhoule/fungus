import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import contains from './contains';
import every from './every';
import foldl from './foldl';
import foldr from './foldr';
import forEach from './forEach';
import forEachRight from './forEachRight';
import groupBy from './groupBy';
import map from './map';
import size from './size';

defineAliases(['all'], every);
defineAliases(['each'], forEach);
defineAliases(['eachRight'], forEachRight);
defineAliases(['map'], map);
defineAliases(['reduce', 'reduceLeft'], foldl);
defineAliases(['reduceRight'], foldr);

export default setupAliases({
  contains,
  every,
  foldl,
  foldr,
  forEach,
  forEachRight,
  groupBy,
  map,
  size
});
