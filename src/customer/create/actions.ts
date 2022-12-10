import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const CustomerCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CustomerCreateDialog" */ './CustomerCreateDialog'
    ),
  'CustomerCreateDialog',
);

export const customerCreateDialog = (resolve?) =>
  openModalDialog(CustomerCreateDialog, {
    size: 'lg',
    resolve: { role: 'CUSTOMER', ...resolve },
  });
