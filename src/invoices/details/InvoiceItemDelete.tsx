import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { waitForConfirmation } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import { deleteInvoiceItem } from '../api';

export const InvoiceItemDelete = ({ item, refreshInvoiceItems }) => {
  const dispatch = useDispatch();
  const callback = async () => {
    try {
      await waitForConfirmation(
        dispatch,
        translate('Confirmation'),
        translate('Are you sure you want to remove invoice item {name}?', {
          name: item.name,
        }),
      );
    } catch {
      return;
    }
    try {
      await deleteInvoiceItem(item.uuid);
      refreshInvoiceItems();
      dispatch(showSuccess(translate('Invoice item has been removed.')));
    } catch (e) {
      dispatch(
        showErrorResponse(e, translate('Unable to delete invoice item.')),
      );
    }
  };
  return (
    <ActionItem
      action={callback}
      title={translate('Remove')}
      icon="fa fa-trash"
    />
  );
};
