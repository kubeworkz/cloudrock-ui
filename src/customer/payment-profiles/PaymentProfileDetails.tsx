import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { getCustomer } from '@cloudrock/workspace/selectors';

export const PaymentProfileDetails: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  if (!customer) {
    return null;
  }

  const profile = customer.payment_profiles.find((p) => p.is_active);
  return profile ? (
    <div style={{ marginBottom: '20px' }}>
      <p>
        <b>{translate('Name')}: </b>
        {profile.name}
      </p>
      <p>
        <b>{translate('Type')}: </b>
        {profile.payment_type_display}
      </p>
    </div>
  ) : null;
};
