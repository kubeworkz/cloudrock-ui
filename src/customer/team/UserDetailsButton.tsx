import React from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { openUserPopover } from '@cloudrock/user/actions';
import { User } from '@cloudrock/workspace/types';

interface UserDetailsButtonProps {
  user: User;
}

export const UserDetailsButton: React.FC<UserDetailsButtonProps> = ({
  user,
}) => {
  const dispatch = useDispatch();
  const callback = () =>
    dispatch(
      openUserPopover({
        user_uuid: user.uuid,
      }),
    );
  return (
    <ActionButton
      action={callback}
      title={translate('Details')}
      icon="fa fa-eye"
    />
  );
};
