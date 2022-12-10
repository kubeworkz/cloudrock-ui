import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import { getDefaultResourceTabs } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const OpenStackResourceUsage = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackResourceUsage" */ '@cloudrock/openstack/OpenStackResourceUsage'
    ),
  'OpenStackResourceUsage',
);
const QuotasTable = lazyComponent(
  () =>
    import(/* webpackChunkName: "QuotasTable" */ '@cloudrock/quotas/QuotasTable'),
  'QuotasTable',
);
const FloatingIpsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "FloatingIpsList" */ '../openstack-floating-ips/FloatingIpsList'
    ),
  'FloatingIpsList',
);
const TenantNetworksList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "TenantNetworksList" */ '../openstack-network/TenantNetworksList'
    ),
  'TenantNetworksList',
);
const SecurityGroupsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SecurityGroupsList" */ '../openstack-security-groups/SecurityGroupsList'
    ),
  'SecurityGroupsList',
);
const ServerGroupsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ServerGroupsList" */ '../openstack-server-groups/ServerGroupsList'
    ),
  'ServerGroupsList',
);
const TenantPortsList = lazyComponent(
  () => import(/* webpackChunkName: "TenantPortsList" */ './TenantPortsList'),
  'TenantPortsList',
);
const TenantRoutersList = lazyComponent(
  () =>
    import(/* webpackChunkName: "TenantRoutersList" */ './TenantRoutersList'),
  'TenantRoutersList',
);

ResourceTabsConfiguration.register('OpenStack.Tenant', () => [
  {
    key: 'routers',
    title: translate('Routers'),
    component: TenantRoutersList,
  },
  {
    key: 'networks',
    title: translate('Networks'),
    component: TenantNetworksList,
  },
  {
    key: 'security_groups',
    title: translate('Security groups'),
    component: SecurityGroupsList,
  },
  ...(isFeatureVisible('openstack.server_groups')
    ? [
        {
          key: 'server_groups',
          title: translate('Server groups'),
          component: ServerGroupsList,
        },
      ]
    : []),
  {
    key: 'floating_ips',
    title: translate('Floating IPs'),
    component: FloatingIpsList,
  },
  {
    key: 'ports',
    title: translate('Ports'),
    component: TenantPortsList,
  },
  {
    key: 'quotas',
    title: translate('Quotas'),
    component: QuotasTable,
  },
  {
    key: 'usage',
    title: translate('Usage'),
    component: OpenStackResourceUsage,
  },
  ...getDefaultResourceTabs(),
]);
