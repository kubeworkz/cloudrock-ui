import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const NetworkSubnetsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "NetworkSubnetsList" */ '../openstack-subnet/NetworkSubnetsList'
    ),
  'NetworkSubnetsList',
);

ResourceTabsConfiguration.register('OpenStack.Network', () => [
  {
    key: 'subnets',
    title: translate('Subnets'),
    component: NetworkSubnetsList,
  },
  getEventsTab(),
]);
