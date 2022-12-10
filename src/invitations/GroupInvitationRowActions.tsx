import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { GroupInvitationCancelButton } from '@cloudrock/invitations/GroupInvitationCancelButton';
import {
  getUser,
  isOwnerOrStaff as isOwnerOrStaffSelector,
} from '@cloudrock/workspace/selectors';

interface GroupInvitationRowActionsProps {
  refreshList;
  row;
}

export const GroupInvitationRowActions: FunctionComponent<GroupInvitationRowActionsProps> =
  ({ row, refreshList }) => {
    const user = useSelector(getUser);
    const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
    return isOwnerOrStaff || user.is_support ? (
      <ButtonGroup>
        {row.is_active && (
          <GroupInvitationCancelButton
            permissionRequest={row}
            refreshList={refreshList}
          />
        )}
      </ButtonGroup>
    ) : null;
  };
