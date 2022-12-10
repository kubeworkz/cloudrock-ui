import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const InvoiceItemMoveDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InvoiceItemMoveDialog" */ './InvoiceItemMoveDialog'
    ),
  'InvoiceItemMoveDialog',
);

export const InvoiceItemMove = ({ invoice, item, refreshInvoiceItems }) => (
  <DialogActionItem
    title={translate('Move item')}
    icon="fa fa-exchange"
    modalComponent={InvoiceItemMoveDialog}
    resource={item}
    extraResolve={{ invoice, refreshInvoiceItems }}
  />
);
