import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import {
  getCustomer,
  isStaff as isStaffSelector,
  isSupport as isSupportSelector,
  isOwner as isOwnerSelector,
} from '@cloudrock/workspace/selectors';

import { CustomerAccordion } from '../details/CustomerAccordion';

import { PaymentProfileDetails } from './PaymentProfileDetails';
import { PaymentProfileList } from './PaymentProfileList';

export const PaymentProfilesPanel: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  const isStaff = useSelector(isStaffSelector);
  const isSupport = useSelector(isSupportSelector);
  const isOwner = useSelector(isOwnerSelector);
  if (isStaff || isSupport || (isOwner && customer.payment_profiles.length)) {
    return (
      <CustomerAccordion
        title={translate('Payment profiles')}
        subtitle={translate(
          'Payment profile defines how invoices are processed.',
        )}
      >
        {isOwner && !isStaff && !isSupport && <PaymentProfileDetails />}
        {(isStaff || isSupport) && <PaymentProfileList />}
      </CustomerAccordion>
    );
  } else {
    return null;
  }
};
