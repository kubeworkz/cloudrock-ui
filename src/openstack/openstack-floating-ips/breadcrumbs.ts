import { translate } from '@cloudrock/i18n';
import { ResourceBreadcrumbsRegistry } from '@cloudrock/resource/breadcrumbs/ResourceBreadcrumbsRegistry';

import { getTenantListState } from '../utils';

ResourceBreadcrumbsRegistry.register('OpenStack.FloatingIP', (resource) => {
  return [
    getTenantListState(resource.project_uuid),
    {
      label: resource.tenant_name,
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: resource.tenant_uuid,
        resource_type: 'OpenStack.Tenant',
      },
    },
    {
      label: translate('Floating IPs'),
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: resource.tenant_uuid,
        resource_type: 'OpenStack.Tenant',
        tab: 'floating_ips',
      },
    },
  ];
});
