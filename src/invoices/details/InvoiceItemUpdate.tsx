import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const InvoiceItemUpdateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InvoiceItemUpdateDialog" */ './InvoiceItemUpdateDialog'
    ),
  'InvoiceItemUpdateDialog',
);

export const InvoiceItemUpdate = ({ item, refreshInvoiceItems }) => (
  <DialogActionItem
    title={translate('Edit item')}
    icon="fa fa-edit"
    modalComponent={InvoiceItemUpdateDialog}
    resource={item}
    extraResolve={{ refreshInvoiceItems }}
  />
);
