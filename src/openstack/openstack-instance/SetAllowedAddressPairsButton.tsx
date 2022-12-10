import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const SetAllowedAddressPairsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SetAllowedAddressPairsDialog" */ './SetAllowedAddressPairsDialog'
    ),
  'SetAllowedAddressPairsDialog',
);

export const SetAllowedAddressPairsButton: FunctionComponent<{
  instance;
  internalIp;
}> = ({ instance, internalIp }) => {
  const dispatch = useDispatch();
  const openDialog = () =>
    dispatch(
      openModalDialog(SetAllowedAddressPairsDialog, {
        resolve: {
          instance,
          internalIp,
        },
        size: 'lg',
      }),
    );
  return (
    <ActionButton
      title={translate('Set allowed address pairs')}
      icon="fa fa-pencil"
      action={openDialog}
    />
  );
};
