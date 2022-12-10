import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import { getDefaultResourceTabs } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const AllocationUsageTable = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SlurmAllocationUsageTable" */ './details/AllocationUsageTable'
    ),
  'AllocationUsageTable',
);

const AllocationUsersTable = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SlurmAllocationUsersTable" */ './details/AllocationUsersTable'
    ),
  'AllocationUsersTable',
);

const AllocationJobsTable = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SlurmAllocationJobsTable" */ './details/AllocationJobsTable'
    ),
  'AllocationJobsTable',
);

ResourceTabsConfiguration.register('SLURM.Allocation', () => [
  {
    key: 'usage',
    title: translate('Usage'),
    component: AllocationUsageTable,
  },
  ...getDefaultResourceTabs(),
  {
    key: 'users',
    title: translate('Users'),
    component: AllocationUsersTable,
  },
  isFeatureVisible('slurm.jobs') && {
    key: 'jobs',
    title: translate('Jobs'),
    component: AllocationJobsTable,
  },
]);
