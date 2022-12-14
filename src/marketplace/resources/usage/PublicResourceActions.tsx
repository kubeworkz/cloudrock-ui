import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Resource } from '@cloudrock/marketplace/resources/types';
import { isSupportOnly } from '@cloudrock/workspace/selectors';

import { SetBackendIdButton } from '../SetBackendIdButton';

import { ResourceCreateUsageButton } from './ResourceCreateUsageButton';
import { ResourceShowUsageButton } from './ResourceShowUsageButton';

interface PublicResourceActionsProps {
  row: Pick<
    Resource,
    | 'state'
    | 'plan'
    | 'is_usage_based'
    | 'uuid'
    | 'offering_uuid'
    | 'name'
    | 'customer_name'
    | 'project_name'
    | 'backend_id'
  >;
}

export const PublicResourceActions: FunctionComponent<PublicResourceActionsProps> =
  ({ row }) => {
    const is_support_only = useSelector(isSupportOnly);
    if (!row.is_usage_based || !row.plan || row.state === 'Creating') {
      return <>{'N/A'}</>;
    }
    const disabled = !['OK', 'Updating', 'Terminating'].includes(row.state);
    return (
      <ButtonGroup>
        <ResourceShowUsageButton resource={row} />
        {!is_support_only && (
          <ResourceCreateUsageButton
            offering_uuid={row.offering_uuid}
            resource_uuid={row.uuid}
            resource_name={row.name}
            customer_name={row.customer_name}
            project_name={row.project_name}
            backend_id={row.backend_id}
            disabled={disabled}
          />
        )}
        <SetBackendIdButton resource={row} />
      </ButtonGroup>
    );
  };
