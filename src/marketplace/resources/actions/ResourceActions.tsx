import { FunctionComponent } from 'react';

import { BookingActions } from '@cloudrock/booking/BookingActions';
import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { translate } from '@cloudrock/i18n';
import { PlanDetailsButton } from '@cloudrock/marketplace/details/plan/PlanDetailsButton';
import { OfferingDetailsButton } from '@cloudrock/marketplace/offerings/details/OfferingDetailsButton';
import { ShowReportButton } from '@cloudrock/marketplace/resources/report/ShowReportButton';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { ResourceShowUsageButton } from '@cloudrock/marketplace/resources/usage/ResourceShowUsageButton';
import { ResourceAccessButton } from '@cloudrock/resource/ResourceAccessButton';

import { ResourceActionsButton } from './ResourceActionsButton';

interface ResourceActionsProps {
  resource: Resource;
  reInitResource?(): void;
}

export const ResourceActions: FunctionComponent<ResourceActionsProps> = ({
  resource,
  reInitResource,
}) => (
  <div className="pull-right btn-group">
    <ResourceAccessButton resource={resource} />
    <button className="btn btn-default btn-sm" onClick={reInitResource}>
      <i className="fa fa-refresh" /> {translate('Refresh')}
    </button>
    {Array.isArray(resource.report) && (
      <ShowReportButton report={resource.report} />
    )}
    {resource.offering_type === OFFERING_TYPE_BOOKING ? (
      <BookingActions resource={resource} reInitResource={reInitResource} />
    ) : (
      <ResourceActionsButton
        resource={
          {
            ...resource,
            marketplace_resource_uuid: resource.uuid,
          } as any
        }
        reInitResource={reInitResource}
      />
    )}
    <OfferingDetailsButton resource={resource.uuid} />
    {resource.is_usage_based && <ResourceShowUsageButton resource={resource} />}
    {resource.plan_uuid && <PlanDetailsButton resource={resource.uuid} />}
  </div>
);
