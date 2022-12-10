import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const NotificationCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "NotificationCreateDialog" */ './NotificationCreateDialog'
    ),
  'NotificationCreateDialog',
);

export const NotificationCreateButton: FunctionComponent = () => {
  const dispatch = useDispatch();
  const callback = () => dispatch(openModalDialog(NotificationCreateDialog));
  return (
    <ActionButton
      action={callback}
      title={translate('Create')}
      icon="fa fa-plus"
    />
  );
};
