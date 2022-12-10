import { FunctionComponent, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAsyncFn, useBoolean } from 'react-use';

import { getAll } from '@cloudrock/core/api';
import { InvoicesDropdown } from '@cloudrock/customer/payments/InvoicesDropdown';
import { Invoice } from '@cloudrock/invoices/types';
import { getCustomer } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

interface LinkInvoiceActionProps {
  onInvoiceSelect: (invoice) => any;
  disabled: boolean;
}

const loadInvoices = (customer: Customer) =>
  getAll<Invoice[]>('/invoices/', {
    params: { customer: customer.url, state: 'paid' },
  });

export const LinkInvoiceAction: FunctionComponent<LinkInvoiceActionProps> = (
  props,
) => {
  const customer = useSelector(getCustomer);

  const [{ loading, error, value }, getInvoices] = useAsyncFn(
    () => loadInvoices(customer),
    [customer],
  );

  const [open, onToggle] = useBoolean(false);

  const loadInvoicesIfOpen = useCallback(() => {
    open && getInvoices();
  }, [open, getInvoices]);

  useEffect(loadInvoicesIfOpen, [open]);

  const triggerAction = (selectedInvoice: Invoice) => {
    if (props.disabled) {
      return;
    }
    props.onInvoiceSelect(selectedInvoice);
  };

  return (
    <InvoicesDropdown
      open={open}
      disabled={props.disabled}
      loading={loading}
      error={error}
      invoices={value}
      onToggle={onToggle}
      onSelect={triggerAction}
    />
  );
};
