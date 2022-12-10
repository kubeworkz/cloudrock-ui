import { getUUID } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { ResourceBreadcrumbsRegistry } from '@cloudrock/resource/breadcrumbs/ResourceBreadcrumbsRegistry';

import { getTenantListState } from '../utils';

ResourceBreadcrumbsRegistry.register('OpenStack.SubNet', (resource) => {
  const tenant_uuid = getUUID(resource.tenant);
  const network_uuid = getUUID(resource.network);
  return [
    getTenantListState(resource.project_uuid),
    {
      label: resource.tenant_name,
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: tenant_uuid,
        resource_type: 'OpenStack.Tenant',
      },
    },
    {
      label: translate('Networks'),
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: tenant_uuid,
        resource_type: 'OpenStack.Tenant',
        tab: 'networks',
      },
    },
    {
      label: resource.network_name,
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: network_uuid,
        resource_type: 'OpenStack.Network',
      },
    },
    {
      label: translate('Subnets'),
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: network_uuid,
        resource_type: 'OpenStack.Network',
        tab: 'subnets',
      },
    },
  ];
});
