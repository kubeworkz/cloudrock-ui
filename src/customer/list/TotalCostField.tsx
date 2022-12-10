import { FunctionComponent } from 'react';

import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { translate } from '@cloudrock/i18n';
import { PriceTooltip } from '@cloudrock/price/PriceTooltip';

interface TotalCostFieldProps {
  total: number;
}

export const TotalCostField: FunctionComponent<TotalCostFieldProps> = (
  props,
) => (
  <div className="text-right">
    {translate('Total cost:')}
    <PriceTooltip /> {defaultCurrency(props.total)}
  </div>
);
