import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const BackupSnapshotsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackupSnapshotsList" */ './BackupSnapshotsList'
    ),
  'BackupSnapshotsList',
);

ResourceTabsConfiguration.register('OpenStackTenant.Backup', () => [
  {
    key: 'snapshots',
    title: translate('Volume snapshots'),
    component: BackupSnapshotsList,
  },
  getEventsTab(),
]);
