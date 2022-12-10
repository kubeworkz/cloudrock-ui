import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const BackupsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackupsList" */ '../openstack-backup/BackupsList'
    ),
  'BackupsList',
);

ResourceTabsConfiguration.register('OpenStackTenant.BackupSchedule', () => [
  {
    key: 'backups',
    title: translate('VM snapshots'),
    component: BackupsList,
  },
  getEventsTab(),
]);
