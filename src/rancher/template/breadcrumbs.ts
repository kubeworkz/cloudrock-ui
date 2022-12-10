import { translate } from '@cloudrock/i18n';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';

import { Template, Cluster } from '../types';

export const getBreadcrumbs = (
  cluster: Cluster,
  template: Template,
): BreadcrumbItem[] => {
  return [
    {
      label: translate('Project workspace'),
      state: 'project.details',
    },
    {
      label: translate('Resources'),
      state: 'marketplace-project-resources',
      params: {
        category_uuid: cluster.marketplace_category_uuid,
      },
    },
    {
      label: cluster.name,
      state: 'resource-details',
      params: {
        uuid: cluster.project_uuid,
        resource_uuid: cluster.uuid,
        resource_type: 'Rancher.Cluster',
        tab: 'catalogs',
      },
    },
    {
      label: translate('Application catalogues'),
    },
    {
      label: template.catalog_name,
      state: 'rancher-catalog-details',
      params: {
        clusterUuid: cluster.uuid,
        catalogUuid: template.catalog_uuid,
      },
    },
    {
      label: translate('Application templates'),
    },
  ];
};
