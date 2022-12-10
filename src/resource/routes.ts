import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';

const ResourceDetailsContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ResourceDetailsContainer" */ './ResourceDetailsContainer'
    ),
  'ResourceDetailsContainer',
);

export const states: StateDeclaration[] = [
  {
    name: 'resource-details',
    url: 'resources/:resource_type/:resource_uuid/:tab',
    component: ResourceDetailsContainer,
    params: {
      tab: {
        value: '',
        dynamic: true,
      },
    },
    parent: 'project',
  },
];
