import { FunctionComponent } from 'react';

import { CopyToClipboardContainer } from '@cloudrock/core/CopyToClipboardContainer';
import { translate } from '@cloudrock/i18n';
import { UserPermissionRequestsList } from '@cloudrock/invitations/UserPermissionRequestsList';

export const GroupInvitationsListExpandableRow: FunctionComponent<{
  row;
}> = ({ row }) => (
  <div className="ibox-content">
    <p>
      <b>{translate('Invitation link')}: </b>
      <CopyToClipboardContainer
        value={`${location.origin}/user-group-invitation/${row.uuid}/`}
      />
    </p>
    <UserPermissionRequestsList groupInvitationUuid={row.uuid} />
  </div>
);
