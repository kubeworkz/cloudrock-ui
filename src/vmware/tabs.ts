import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getDefaultResourceTabs } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const DisksList = lazyComponent(
  () => import(/* webpackChunkName: "DisksList" */ './DisksList'),
  'DisksList',
);
const PortsList = lazyComponent(
  () => import(/* webpackChunkName: "PortsList" */ './PortsList'),
  'PortsList',
);

ResourceTabsConfiguration.register('VMware.VirtualMachine', () => [
  {
    key: 'disks',
    title: translate('Disks'),
    component: DisksList,
  },
  {
    key: 'ports',
    title: translate('Network adapters'),
    component: PortsList,
  },
  ...getDefaultResourceTabs(),
]);
