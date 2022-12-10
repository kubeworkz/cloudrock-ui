import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const UserDetailsDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "UserDetailsDialog" */ './UserDetailsDialog'),
  'UserDetailsDialog',
);

export const UserDetailsButton: FunctionComponent<{ user }> = ({ user }) => {
  const dispatch = useDispatch();
  const callback = () =>
    dispatch(
      openModalDialog(UserDetailsDialog, {
        resolve: {
          user: user,
        },
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
