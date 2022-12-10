import { FunctionComponent } from 'react';
import { PanelBody } from 'react-bootstrap';

import { ENV } from '@cloudrock/configs/default';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { useTitle } from '@cloudrock/navigation/title';
import { PayPalInvoicesList } from '@cloudrock/paypal/PayPalInvoicesList';

import { getTabTitle } from '../utils';

import { AgreementInfo } from './AgreementInfo';
import { BillingRecordsList } from './BillingRecordsList';
import { EstimatedCost } from './EstimatedCost';
import { InvoicesList } from './InvoicesList';

export const BillingTabs: FunctionComponent = () => {
  useTitle(getTabTitle());
  return ENV.accountingMode === 'accounting' ? (
    <PanelBody>
      <AgreementInfo />
      <BillingRecordsList />
    </PanelBody>
  ) : (
    <PanelBody>
      <AgreementInfo />
      <EstimatedCost />
      {isFeatureVisible('paypal') ? <PayPalInvoicesList /> : <InvoicesList />}
    </PanelBody>
  );
};
