import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getDefaultResourceTabs } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const BackupsSchedulesList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackupSchedulesList" */ '../openstack-backup-schedule/BackupSchedulesList'
    ),
  'BackupsSchedulesList',
);
const BackupsList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackupsList" */ '../openstack-backup/BackupsList'
    ),
  'BackupsList',
);
const InstanceVolumesList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InstanceVolumesList" */ '../openstack-volume/InstanceVolumesList'
    ),
  'InstanceVolumesList',
);
const InternalIpsList = lazyComponent(
  () => import(/* webpackChunkName: "InternalIpsList" */ './InternalIpsList'),
  'InternalIpsList',
);

ResourceTabsConfiguration.register('OpenStackTenant.Instance', () => [
  {
    key: 'volumes',
    title: translate('Volumes'),
    component: InstanceVolumesList,
  },
  {
    key: 'backups',
    title: translate('VM snapshots'),
    component: BackupsList,
  },
  {
    key: 'backup_schedules',
    title: translate('VM snapshot schedules'),
    component: BackupsSchedulesList,
  },
  {
    key: 'internal_ips_set',
    title: translate('Internal IPs'),
    component: InternalIpsList,
  },
  ...getDefaultResourceTabs(),
]);
