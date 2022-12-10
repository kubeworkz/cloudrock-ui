import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { formatCurrency } from '@cloudrock/core/formatCurrency';
import { translate } from '@cloudrock/i18n';
import { PriceTooltip } from '@cloudrock/price/PriceTooltip';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';

import { Component } from './types';

export const LimitlessComponentsTable = ({
  components,
}: {
  components: Component[];
}) => {
  const shouldConcealPrices = useSelector((state: RootState) =>
    isVisible(state, 'marketplace.conceal_prices'),
  );
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>{translate('Component name')}</th>
          <th>{translate('Unit')}</th>
          {!shouldConcealPrices && (
            <th>
              {translate('Price per unit')}
              <PriceTooltip />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {components.map((component, index) => (
          <tr key={index}>
            <td>
              <p>{component.name}</p>
            </td>
            <td>
              <p>{component.measured_unit}</p>
            </td>
            {!shouldConcealPrices && (
              <td>
                <p>
                  {formatCurrency(
                    component.price,
                    ENV.plugins.CLOUDROCK_CORE.CURRENCY_NAME,
                    4,
                  )}
                </p>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
