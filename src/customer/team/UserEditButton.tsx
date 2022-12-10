import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { getUser, getCustomer } from '@cloudrock/workspace/selectors';
import { User } from '@cloudrock/workspace/types';

const EditTeamMemberDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "EditTeamMemberDialog" */ './EditTeamMemberDialog'
    ),
  'EditTeamMemberDialog',
);

interface UserEditButtonProps {
  editUser: User;
}

export const UserEditButton: React.FC<UserEditButtonProps> = ({ editUser }) => {
  const currentUser = useSelector(getUser);
  const currentCustomer = useSelector(getCustomer);
  const dispatch = useDispatch();
  const callback = () =>
    dispatch(
      openModalDialog(EditTeamMemberDialog, {
        resolve: {
          currentCustomer,
          currentUser,
          editUser,
        },
        size: 'lg',
      }),
    );
  return (
    <ActionButton
      action={callback}
      title={translate('Edit')}
      icon="fa fa-pencil"
    />
  );
};
