import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const CustomerUserAddDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CustomerUserAddDialog" */ './CustomerUserAddDialog'
    ),
  'CustomerUserAddDialog',
);

interface CustomerUserAddButtonProps {
  refreshList;
}

export const CustomerUserAddButton: FunctionComponent<CustomerUserAddButtonProps> =
  ({ refreshList }) => {
    const dispatch = useDispatch();
    const callback = () =>
      dispatch(
        openModalDialog(CustomerUserAddDialog, { resolve: { refreshList } }),
      );

    return (
      <ActionButton
        action={callback}
        title={translate('Add owner')}
        icon="fa fa-plus"
      />
    );
  };
