import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';
import { SUPPORT_WORKSPACE } from '@cloudrock/workspace/types';

import { checkPermission } from './utils';

const CustomersDivisionsContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CustomersDivisionsContainer" */ '@cloudrock/customer/divisions/CustomersDivisionsContainer'
    ),
  'CustomersDivisionsContainer',
);
const CustomerListContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CustomerListContainer" */ '@cloudrock/customer/list/CustomerListContainer'
    ),
  'CustomerListContainer',
);
const PriceListContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "PriceListContainer" */ '@cloudrock/marketplace/offerings/PriceListContainer'
    ),
  'PriceListContainer',
);
const CustomerRequestContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CustomerRequestContainer" */ '@cloudrock/marketplace-flows/CustomerRequestContainer'
    ),
  'CustomerRequestContainer',
);
const OrganizationUpdateContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OrganizationUpdateContainer" */ '@cloudrock/customer/list/OrganizationUpdateContainer'
    ),
  'OrganizationUpdateContainer',
);
const SupportCustomersContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportCustomersContainer" */ '@cloudrock/customer/list/SupportCustomersContainer'
    ),
  'SupportCustomersContainer',
);
const SupportProjectsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportProjectsList" */ '@cloudrock/project/SupportProjectsList'
    ),
  'SupportProjectsList',
);
const SupportFeedback = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportFeedback" */ '@cloudrock/issues/feedback/SupportFeedback'
    ),
  'SupportFeedback',
);
const SupportFeedbackListContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportFeedbackListContainer" */ '@cloudrock/issues/feedback/SupportFeedbackListContainer'
    ),
  'SupportFeedbackListContainer',
);
const SupportIssues = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportIssues" */ '@cloudrock/issues/SupportIssues'
    ),
  'SupportIssues',
);
const FlowMapViewContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "FlowMapViewContainer" */ '@cloudrock/providers/support/FlowMapViewContainer'
    ),
  'FlowMapViewContainer',
);
const HeatMapContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "HeatMapContainer" */ '@cloudrock/providers/support/HeatMapContainer'
    ),
  'HeatMapContainer',
);
const SankeyDiagramContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SankeyDiagramContainer" */ '@cloudrock/providers/support/SankeyDiagramContainer'
    ),
  'SankeyDiagramContainer',
);
const UserListView = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "UserListView" */ '@cloudrock/user/support/UserListView'
    ),
  'UserListView',
);
const IssueDetailsContainer = lazyComponent(
  () => import(/* webpackChunkName: "IssueDetails" */ './IssueDetails'),
  'IssueDetails',
);
const BroadcastList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BroadcastList" */ './notifications/BroadcastList'
    ),
  'BroadcastList',
);
const IssuesDashboard = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "IssuesDashboard" */ './workspace/IssuesDashboard'
    ),
  'IssuesDashboard',
);
const IssuesHelpdesk = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "IssuesHelpdesk" */ './workspace/IssuesHelpdesk'
    ),
  'IssuesHelpdesk',
);
const SupportWorkspace = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SupportWorkspace" */ './workspace/SupportWorkspace'
    ),
  'SupportWorkspace',
);
const FeaturesList = lazyComponent(
  () =>
    import(/* webpackChunkName: "FeaturesList" */ './workspace/FeaturesList'),
  'FeaturesList',
);

export const states: StateDeclaration[] = [
  {
    name: 'support',
    url: '/support/',
    component: SupportWorkspace,
    abstract: true,
    data: {
      auth: true,
      workspace: SUPPORT_WORKSPACE,
      pageClass: 'gray-bg',
    },
  },

  {
    name: 'support.dashboard',
    url: '',
    component: IssuesDashboard,
    data: {
      hideBreadcrumbs: true,
    },
  },

  {
    name: 'support.helpdesk',
    url: 'helpdesk/',
    component: IssuesHelpdesk,
  },

  {
    name: 'support.detail',
    url: 'issue/:uuid/',
    component: IssueDetailsContainer,
  },

  {
    name: 'support.list',
    url: 'list/',
    component: SupportIssues,
  },

  {
    name: 'supportFeedback',
    url: '/support/feedback/?token&evaluation',
    component: SupportFeedback,
  },

  {
    name: 'support.feedback',
    url: 'feedback/',
    component: SupportFeedbackListContainer,
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.organizations',
    url: 'organizations/',
    component: CustomerListContainer,
    data: {
      feature: 'support.customers_list',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.pricelist',
    url: 'pricelist/',
    component: PriceListContainer,
    data: {
      feature: 'support.pricelist',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.customers-requests',
    url: 'customers-requests/',
    component: CustomerRequestContainer,
    data: {
      feature: 'support.customers_requests',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.organizations-divisions',
    url: 'organizations-divisions/',
    component: CustomersDivisionsContainer,
    data: {
      feature: 'support.customers_list',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.users',
    url: 'users/',
    component: UserListView,
    data: {
      feature: 'support.users',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.customers',
    url: 'customers/',
    component: SupportCustomersContainer,
    data: {
      feature: 'support.customers_list',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.customer-update',
    url: 'customer-update/:customer_uuid/',
    component: OrganizationUpdateContainer,
    data: {
      feature: 'support.customers_list',
      pageClass: 'white-bg',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.projects',
    url: 'projects/',
    component: SupportProjectsList,
    data: {
      pageClass: 'white-bg',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.flowmap',
    url: 'flowmap/',
    component: FlowMapViewContainer,
    data: {
      feature: 'support.flowmap',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.heatmap',
    url: 'heatmap/',
    component: HeatMapContainer,
    data: {
      feature: 'support.heatmap',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.sankey-diagram',
    url: 'sankey-diagram/',
    component: SankeyDiagramContainer,
    data: {
      feature: 'support.sankey_diagram',
    },
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.broadcast',
    url: 'broadcast/',
    component: BroadcastList,
    resolve: {
      permission: checkPermission,
    },
  },

  {
    name: 'support.features',
    url: 'features/',
    component: FeaturesList,
    resolve: {
      permission: checkPermission,
    },
  },
];
