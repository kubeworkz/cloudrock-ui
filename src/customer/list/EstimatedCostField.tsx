import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { DASH_ESCAPE_CODE } from '@cloudrock/table/constants';
import { Customer } from '@cloudrock/workspace/types';

export const EstimatedCostField: FunctionComponent<{ row: Customer }> = ({
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
    return defaultCurrency(estimate.total);
  } else {
    return defaultCurrency(
      parseFloat(estimate.total) + parseFloat(estimate.tax),
    );
  }
};

export const ExportEstimatedCostField = ({
  row,
}: {
  row: Customer;
}): number | string => {
  if (getActiveFixedPricePaymentProfile(row.payment_profiles)) {
    return DASH_ESCAPE_CODE;
  }
  const estimate = row.billing_price_estimate;
  if (!estimate) {
    return 0;
  }
  // VAT is not included only when accounting mode is activated
  if (ENV.accountingMode === 'accounting') {
    return parseFloat(estimate.total);
  } else {
    return parseFloat(estimate.total) + parseFloat(estimate.tax);
  }
};
