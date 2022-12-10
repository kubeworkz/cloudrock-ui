import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';
import { checkPermission } from '@cloudrock/issues/utils';

const ResourcesTreemap = lazyComponent(
  () => import(/* webpackChunkName: "ResourcesTreemap" */ './ResourcesTreemap'),
  'ResourcesTreemap',
);
const SharedProviderContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SharedProviderContainer" */ './SharedProviderContainer'
    ),
  'SharedProviderContainer',
);

export const states: StateDeclaration[] = [
  {
    name: 'support.resources-treemap',
    url: 'resources-treemap/',
    component: ResourcesTreemap,
    data: {
      feature: 'support.resources_treemap',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.shared-providers',
    url: 'shared-providers/',
    component: SharedProviderContainer,
    data: {
      feature: 'support.shared_providers',
    },
    resolve: {
      permission: checkPermission,
    },
  },
];
