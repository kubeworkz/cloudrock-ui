import { getUUID } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { ResourceBreadcrumbsRegistry } from '@cloudrock/resource/breadcrumbs/ResourceBreadcrumbsRegistry';

import { getInstanceListState } from '../utils';

ResourceBreadcrumbsRegistry.register(
  'OpenStackTenant.SnapshotSchedule',
  (resource) => {
    const volume_uuid = getUUID(resource.source_volume);
    return [
      getInstanceListState(resource.project_uuid),
      {
        label: resource.source_volume_name,
        state: 'resource-details',
        params: {
          uuid: resource.project_uuid,
          resource_uuid: volume_uuid,
          resource_type: 'OpenStackTenant.Volume',
        },
      },
      {
        label: translate('Snapshot schedules'),
        state: 'resource-details',
        params: {
          uuid: resource.project_uuid,
          resource_uuid: volume_uuid,
          resource_type: 'OpenStackTenant.Volume',
          tab: 'snapshot_schedules',
        },
      },
    ];
  },
);
