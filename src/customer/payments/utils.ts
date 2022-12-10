import { PAYMENTS_TABLE } from '@cloudrock/customer/details/constants';
import { getActivePaymentProfile } from '@cloudrock/invoices/details/utils';
import { fetchListStart } from '@cloudrock/table/actions';
import { Customer } from '@cloudrock/workspace/types';

export const getInitialValues = (props) => ({
  date_of_payment: props.resolve.date_of_payment,
  sum: props.resolve.sum,
});

export const updatePaymentsList = (customer: Customer) =>
  fetchListStart(PAYMENTS_TABLE, {
    profile_uuid: getActivePaymentProfile(customer.payment_profiles)?.uuid,
  });
