import React from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const OfferingPermissionCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingPermissionCreateDialog" */ './OfferingPermissionCreateDialog'
    ),
  'OfferingPermissionCreateDialog',
);

export const OfferingPermissionCreateButton: React.FC = () => {
  const dispatch = useDispatch();
  const callback = () => {
    dispatch(openModalDialog(OfferingPermissionCreateDialog));
  };
  return (
    <ActionButton
      action={callback}
      title={translate('Add user')}
      icon="fa fa-plus"
    />
  );
};
