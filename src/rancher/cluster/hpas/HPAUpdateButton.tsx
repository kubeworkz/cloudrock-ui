import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const HPAUpdateDialog = lazyComponent(
  () => import(/* webpackChunkName: "HPAUpdateDialog" */ './HPAUpdateDialog'),
  'HPAUpdateDialog',
);

const editHPADialog = (hpa) =>
  openModalDialog(HPAUpdateDialog, { resolve: { hpa } });

export const HPAUpdateButton: FunctionComponent<{ hpa }> = ({ hpa }) => {
  const dispatch = useDispatch();
  const callback = () => dispatch(editHPADialog(hpa));
  return (
    <ActionButton
      title={translate('Edit')}
      action={callback}
      icon="fa fa-edit"
    />
  );
};
