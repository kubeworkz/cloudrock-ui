import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { DASH_ESCAPE_CODE } from '@cloudrock/table/constants';
import { Customer } from '@cloudrock/workspace/types';

export const CurrentCostField: FunctionComponent<{ row: Customer }> = ({
  row,
}) => {
  if (getActiveFixedPricePaymentProfile(row.payment_profiles)) {
    return DASH_ESCAPE_CODE;
  }
  const estimate = row.billing_price_estimate;
  if (!estimate) {
    return defaultCurrency(0);
  }
  // VAT is not included only when accounting mode is activated
  if (ENV.accountingMode === 'accounting') {
    return defaultCurrency(estimate.current);
  } else {
    return defaultCurrency(
      parseFloat(estimate.current) + parseFloat(estimate.tax_current),
    );
  }
};
