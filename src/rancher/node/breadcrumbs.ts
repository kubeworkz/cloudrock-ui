import { translate } from '@cloudrock/i18n';
import { ResourceBreadcrumbsRegistry } from '@cloudrock/resource/breadcrumbs/ResourceBreadcrumbsRegistry';

ResourceBreadcrumbsRegistry.register('Rancher.Node', (resource) => {
  return [
    {
      label: resource.cluster_name,
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: resource.cluster_uuid,
        resource_type: 'Rancher.Cluster',
      },
    },
    {
      label: translate('Nodes'),
      state: 'resource-details',
      params: {
        uuid: resource.project_uuid,
        resource_uuid: resource.cluster_uuid,
        resource_type: 'Rancher.Cluster',
        tab: 'nodes',
      },
    },
  ];
});
