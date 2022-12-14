import eventsRegistry from '@cloudrock/events/registry';
import { getCustomerContext } from '@cloudrock/events/utils';
import { gettext } from '@cloudrock/i18n';

const getInvoiceContext = (event) => ({
  ...getCustomerContext(event),
  period: event.invoice_date,
});

eventsRegistry.registerGroup({
  title: gettext('Invoice events'),
  context: getInvoiceContext,
  events: [
    {
      key: 'invoice_creation_succeeded',
      title: gettext(
        'Invoice for organization {customer_link} for the period of {period} has been created.',
      ),
    },
    {
      key: 'invoice_deletion_succeeded',
      title: gettext(
        'Invoice for organization {customer_name} for the period of {period} has been deleted.',
      ),
    },
    {
      key: 'invoice_update_succeeded',
      title: gettext(
        'Invoice for organization {customer_link} for the period of {period} has been updated.',
      ),
    },
  ],
});
