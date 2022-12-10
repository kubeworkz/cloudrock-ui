import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { UserDetails } from '@cloudrock/workspace/types';

import { UserDetailsView } from './UserDetailsView';

interface UserDetailsDialogProps {
  resolve: { user: UserDetails };
}

export const UserDetailsDialog: FunctionComponent<UserDetailsDialogProps> = (
  props,
) => {
  return (
    <ModalDialog
      title={translate('User details of {fullName}', {
        fullName: props.resolve.user.full_name,
      })}
      footer={<CloseDialogButton />}
    >
      <UserDetailsView user={props.resolve.user} />
    </ModalDialog>
  );
};
