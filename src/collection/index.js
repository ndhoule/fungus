import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import foldl from './foldl';
import forEach from './forEach';
import forEachRight from './forEachRight';
import groupBy from './groupBy';
import map from './map';

defineAliases(['reduce', 'reduceLeft'], foldl);
defineAliases(['each'], forEach);
defineAliases(['eachRight'], forEachRight);
defineAliases(['map'], map);

export default setupAliases({
  foldl: foldl,
  forEach: forEach,
  forEachRight: forEachRight,
  groupBy: groupBy,
  map: map
});
