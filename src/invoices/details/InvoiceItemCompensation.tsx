import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const InvoiceItemCompensationDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InvoiceItemCompensationDialog" */ './InvoiceItemCompensationDialog'
    ),
  'InvoiceItemCompensationDialog',
);

export const InvoiceItemCompensation = ({ item, refreshInvoiceItems }) => (
  <DialogActionItem
    title={translate('Create compensation')}
    icon="fa fa-plus"
    modalComponent={InvoiceItemCompensationDialog}
    resource={item}
    extraResolve={{ refreshInvoiceItems }}
  />
);
