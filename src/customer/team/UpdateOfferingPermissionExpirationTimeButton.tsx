import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const UpdateOfferingPermissionExpirationTimeDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingPermissionCreateDialog" */ './UpdateOfferingPermissionExpirationTimeDialog'
    ),
  'UpdateOfferingPermissionExpirationTimeDialog',
);

export const UpdateOfferingPermissionExpirationTimeButton: FunctionComponent<{
  permission;
}> = ({ permission }) => {
  const dispatch = useDispatch();
  const callback = () => {
    dispatch(
      openModalDialog(UpdateOfferingPermissionExpirationTimeDialog, {
        resolve: { permission },
      }),
    );
  };
  return (
    <ActionButton
      action={callback}
      title={translate('Edit')}
      icon="fa fa-pencil"
    />
  );
};
