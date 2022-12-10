import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const ScheduleSnapshotsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ScheduleSnapshotsList" */ '../openstack-snapshot/ScheduleSnapshotsList'
    ),
  'ScheduleSnapshotsList',
);

ResourceTabsConfiguration.register('OpenStackTenant.SnapshotSchedule', () => [
  {
    key: 'snapshots',
    title: translate('Snapshots'),
    component: ScheduleSnapshotsList,
  },
  getEventsTab(),
]);
