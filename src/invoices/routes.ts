import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';
import { checkPermission } from '@cloudrock/issues/utils';

const GrowthContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "GrowthContainer" */ '@cloudrock/invoices/growth/GrowthContainer'
    ),
  'GrowthContainer',
);
const BillingDetails = lazyComponent(
  () =>
    import(/* webpackChunkName: "BillingDetails" */ './details/BillingDetails'),
  'BillingDetails',
);
const BillingTabs = lazyComponent(
  () => import(/* webpackChunkName: "BillingTabs" */ './list/BillingTabs'),
  'BillingTabs',
);

export const states: StateDeclaration[] = [
  {
    name: 'organization.billing',
    url: 'billing/',
    component: BillingTabs,
  },

  {
    name: 'billingDetails',
    url: 'billing/:invoice_uuid/?status',
    component: BillingDetails,
    parent: 'organization',
  },

  {
    name: 'invoicesGrowth',
    url: 'growth/',
    component: GrowthContainer,
    parent: 'support',
    resolve: {
      permission: checkPermission,
    },
  },
];
