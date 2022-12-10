import { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';

import { ENV } from '@cloudrock/configs/default';
import { formatCurrency } from '@cloudrock/core/formatCurrency';
import { translate } from '@cloudrock/i18n';
import {
  formatIntField,
  parseIntField,
} from '@cloudrock/marketplace/common/utils';
import { PriceTooltip } from '@cloudrock/price/PriceTooltip';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';

import { Component } from './types';

interface TotalLimitComponentsTableProps {
  components: Component[];
  total: number;
  viewMode: boolean;
}

export const TotalLimitComponentsTable: FunctionComponent<TotalLimitComponentsTableProps> =
  (props) => {
    const shouldConcealPrices = useSelector((state: RootState) =>
      isVisible(state, 'marketplace.conceal_prices'),
    );
    return (
      <Table bordered={true}>
        <thead>
          <tr>
            <th className="col-sm-1">{translate('Component name')}</th>
            <th className="col-sm-1">{translate('Unit')}</th>
            <th className="col-md-2 col-sm-3">{translate('Quantity')}</th>
            {!shouldConcealPrices && (
              <th>
                {translate('Price per unit')}
                <PriceTooltip />
              </th>
            )}
            <th>{translate('Subtotal')}</th>
          </tr>
        </thead>
        <tbody>
          {props.components.map((component, index) => (
            <tr key={index}>
              <td>{component.name}</td>
              <td>{component.measured_unit || 'N/A'}</td>
              <td>
                {props.viewMode ? (
                  component.amount
                ) : (
                  <Field
                    name={`limits.${component.type}`}
                    component="input"
                    type="number"
                    parse={parseIntField}
                    format={formatIntField}
                    className="form-control p-x-sm"
                  />
                )}
              </td>
              {!shouldConcealPrices && (
                <td>
                  {formatCurrency(
                    component.price,
                    ENV.plugins.CLOUDROCK_CORE.CURRENCY_NAME,
                    4,
                  )}
                </td>
              )}
              <td>
                {formatCurrency(
                  component.subTotal,
                  ENV.plugins.CLOUDROCK_CORE.CURRENCY_NAME,
                  4,
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>{translate('Total')}</td>
            <td>
              {formatCurrency(
                props.total,
                ENV.plugins.CLOUDROCK_CORE.CURRENCY_NAME,
                4,
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };
