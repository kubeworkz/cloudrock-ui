import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';

export const BillingPeriod: FunctionComponent<any> = (props) => {
  const labels = {
    month: translate('Price per month'),
    half_month: translate('Price per half month'),
    day: translate('Price per day'),
    hour: translate('Price per hour'),
    quantity: translate('Price per unit'),
  };
  return labels[props.unit] ? labels[props.unit] : null;
};
