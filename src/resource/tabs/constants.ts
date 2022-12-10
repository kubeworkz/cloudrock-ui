import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';

import type { ResourceTab } from './types';

const ResourceOrderItemsTab = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ResourceOrderItems" */ '@cloudrock/marketplace/orders/item/list/ResourceOrderItems'
    ),
  'ResourceOrderItemsTab',
);
const ResourceEvents = lazyComponent(
  () => import(/* webpackChunkName: "ResourceEvents" */ './ResourceEvents'),
  'ResourceEvents',
);
const ResourceIssuesList = lazyComponent(
  () =>
    import(/* webpackChunkName: "ResourceIssuesList" */ './ResourceIssuesList'),
  'ResourceIssuesList',
);

export const getEventsTab = (): ResourceTab => ({
  key: 'events',
  title: translate('Audit log'),
  component: ResourceEvents,
});

const getIssuesTab = (): ResourceTab => ({
  key: 'issues',
  title: translate('Issues'),
  component: ResourceIssuesList,
});

const getOrderItemsTab = (): ResourceTab => ({
  key: 'orderItems',
  title: translate('Order items'),
  component: ResourceOrderItemsTab,
  isVisible: (resource) => Boolean(resource.marketplace_resource_uuid),
});

export const getDefaultResourceTabs = (): ResourceTab[] => [
  getEventsTab(),
  ENV.plugins.CLOUDROCK_SUPPORT && getIssuesTab(),
  getOrderItemsTab(),
];
