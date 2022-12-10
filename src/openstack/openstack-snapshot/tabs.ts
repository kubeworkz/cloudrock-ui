import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const SnapshotRestoredVolumesList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SnapshotRestoredVolumesList" */ './SnapshotRestoredVolumesList'
    ),
  'SnapshotRestoredVolumesList',
);

ResourceTabsConfiguration.register('OpenStackTenant.Snapshot', () => [
  {
    key: 'restored',
    title: translate('Restored volumes'),
    component: SnapshotRestoredVolumesList,
  },
  getEventsTab(),
]);
