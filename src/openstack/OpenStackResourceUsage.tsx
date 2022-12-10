import { FunctionComponent } from 'react';

import { Resource } from '@cloudrock/marketplace/resources/types';
import { ResourceUsageTabsContainer } from '@cloudrock/marketplace/resources/usage/ResourceUsageTabsContainer';

export const OpenStackResourceUsage: FunctionComponent<{
  resource: Resource;
}> = ({ resource }) => (
  <ResourceUsageTabsContainer
    resource={{
      ...resource,
      offering_uuid:
        resource.offering_uuid || resource.marketplace_offering_uuid,
      resource_uuid: resource.uuid || resource.marketplace_resource_uuid,
    }}
  />
);
