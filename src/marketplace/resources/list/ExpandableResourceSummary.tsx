import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getResourceDetails } from '@cloudrock/marketplace/common/api';
import { PlanDetailsLink } from '@cloudrock/marketplace/details/plan/PlanDetailsLink';
import { Field } from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { ResourceSummary as ResourceSummaryResources } from '@cloudrock/resource/summary/ResourceSummary';
import {
  BASIC_OFFERING_TYPE,
  SUPPORT_OFFERING_TYPE,
} from '@cloudrock/support/constants';

import { KeyValueButton } from '../KeyValueButton';

const StaticResourceSummary: FunctionComponent<{ row }> = ({ row }) => (
  <ResourceDetailsTable>
    <Field label={translate('Plan')} value={row.plan_name || 'N/A'} />
    <Field
      label={translate('Plan details')}
      value={row.plan_uuid && <PlanDetailsLink resource={row.uuid} />}
    />
    <Field label={translate('UUID')} value={row.uuid} valueClass="ellipsis" />
    <Field
      label={translate('Attributes')}
      value={
        Object.keys(row.attributes).length > 0 && (
          <KeyValueButton items={row.attributes} />
        )
      }
    />
    {ENV.plugins.CLOUDROCK_MARKETPLACE.ENABLE_RESOURCE_END_DATE ? (
      <Field label={translate('Termination date')} value={row.end_date} />
    ) : null}
  </ResourceDetailsTable>
);

const DynamicResourceSummary: FunctionComponent<{ row }> = ({ row }) => {
  const { value, error, loading } = useAsync(
    () => getResourceDetails(row.uuid),
    [row],
  );

  if (error) {
    return <>{translate('Unable to load detail.')}</>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ResourceSummaryResources
      resource={{
        ...value,
        end_date: row.end_date,
      }}
    />
  );
};

export const ExpandableResourceSummary: FunctionComponent<{ row }> = ({
  row,
}) => (
  <>
    {!row.scope ||
    [SUPPORT_OFFERING_TYPE, BASIC_OFFERING_TYPE].includes(row.offering_type) ? (
      <StaticResourceSummary row={row} />
    ) : (
      <DynamicResourceSummary row={row} />
    )}
  </>
);
