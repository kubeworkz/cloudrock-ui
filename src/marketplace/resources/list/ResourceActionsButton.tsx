import { FunctionComponent } from 'react';

import { ResourceActionsButton as BaseResourceActionsButton } from '@cloudrock/marketplace/resources/actions/ResourceActionsButton';
import { ActionButtonResource } from '@cloudrock/resource/actions/ActionButtonResource';

import { Resource } from '../types';

interface ResourceActionsButtonProps {
  row: Resource;
  refreshList?(): void;
}

export const ResourceActionsButton: FunctionComponent<ResourceActionsButtonProps> =
  ({ row, refreshList }) =>
    row.scope === null || row.offering_type === 'Support.OfferingTemplate' ? (
      <BaseResourceActionsButton
        resource={
          {
            ...row,
            marketplace_resource_uuid: row.uuid,
          } as any
        }
        refreshList={refreshList}
      />
    ) : (
      <>
        <ActionButtonResource url={row.scope} refreshList={refreshList} />
      </>
    );
