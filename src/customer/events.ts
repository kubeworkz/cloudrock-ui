import eventsRegistry from '@cloudrock/events/registry';
import { getCustomerContext } from '@cloudrock/events/utils';
import { gettext } from '@cloudrock/i18n';

eventsRegistry.registerGroup({
  title: gettext('Organization events'),
  context: getCustomerContext,
  events: [
    {
      key: 'customer_creation_succeeded',
      title: gettext('Organization {customer_link} has been created.'),
    },
    {
      key: 'customer_deletion_succeeded',
      title: gettext('Organization {customer_name} has been deleted.'),
    },
    {
      key: 'customer_update_succeeded',
      title: gettext('Organization {customer_link} has been updated.'),
    },
  ],
});
