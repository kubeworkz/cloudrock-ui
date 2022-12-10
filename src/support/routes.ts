import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';
import { checkPermission } from '@cloudrock/issues/utils';

const SupportDetailsContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportDetailsContainer" */ './SupportDetailsContainer'
    ),
  'SupportDetailsContainer',
);
const SupportEventsContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportEventsContainer" */ './SupportEventsContainer'
    ),
  'SupportEventsContainer',
);

export const states: StateDeclaration[] = [
  {
    name: 'project.support-details',
    url: 'support/:resource_uuid/',
    component: SupportDetailsContainer,
  },

  {
    name: 'support.events',
    url: 'events/',
    component: SupportEventsContainer,
    resolve: {
      permission: checkPermission,
    },
  },
];
