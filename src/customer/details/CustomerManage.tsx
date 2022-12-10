import { FunctionComponent } from 'react';

import { PaymentsPanel } from '@cloudrock/customer/payments/PaymentsPanel';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { PaymentProfilesPanel } from '../payment-profiles/PaymentProfilesPanel';

import { CustomerActionsPanel } from './CustomerActionsPanel';
import { CustomerDetailsPanel } from './CustomerDetailsPanel';

export const CustomerManage: FunctionComponent = () => {
  useTitle(translate('Manage organization'));
  return (
    <div style={{ paddingLeft: 10 }}>
      <CustomerDetailsPanel />
      <PaymentProfilesPanel />
      <PaymentsPanel />
      <CustomerActionsPanel />
    </div>
  );
};
