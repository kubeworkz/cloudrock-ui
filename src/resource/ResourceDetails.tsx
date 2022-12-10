import React, { useMemo, FunctionComponent } from 'react';

import { PlanDetailsButton } from '@cloudrock/marketplace/details/plan/PlanDetailsButton';
import { OfferingDetailsButton } from '@cloudrock/marketplace/offerings/details/OfferingDetailsButton';
import { ResourceShowUsageButton } from '@cloudrock/marketplace/resources/usage/ResourceShowUsageButton';
import { OpenStackInstanceTenantButton } from '@cloudrock/openstack/openstack-instance/OpenStackInstanceTenantButton';

import { ActionButtonResource } from './actions/ActionButtonResource';
import { ResourceAccessButton } from './ResourceAccessButton';
import { ResourceRefreshButton } from './ResourceRefreshButton';
import { ResourceSummary } from './summary/ResourceSummary';
import { ResourceTabs } from './tabs/ResourceTabs';
import { formatResourceType } from './utils';

let ResourceDetails: FunctionComponent<{ resource; refreshResource }> = ({
  resource,
  refreshResource,
}) => {
  const header = useMemo(() => {
    return formatResourceType(resource);
  }, [resource]);

  if (!resource) {
    return null;
  }

  return (
    <div className="wrapper wrapper-content">
      <div className="ibox-content">
        <div className="row m-b-md">
          <div className="col-lg-12">
            <div className="pull-right btn-group">
              <ResourceAccessButton resource={resource} />
              <ActionButtonResource
                url={resource.url}
                refreshResource={refreshResource}
              />
              <ResourceRefreshButton refreshResource={refreshResource} />
              <OpenStackInstanceTenantButton resource={resource} />
              {resource.marketplace_resource_uuid && (
                <OfferingDetailsButton
                  resource={resource.marketplace_resource_uuid}
                />
              )}
              {resource.is_usage_based && (
                <ResourceShowUsageButton resource={resource} />
              )}
              {resource.marketplace_plan_uuid && (
                <PlanDetailsButton
                  resource={resource.marketplace_resource_uuid}
                />
              )}
            </div>
            <h2>{header}</h2>
          </div>
        </div>
        <div className="row m-b-md">
          <ResourceSummary resource={resource} />
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ResourceTabs resource={resource} />
          </div>
        </div>
      </div>
    </div>
  );
};

ResourceDetails = React.memo(ResourceDetails);
export { ResourceDetails };
