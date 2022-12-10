import React from 'react';
import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { formatCurrency } from '@cloudrock/core/formatCurrency';
import { Tooltip } from '@cloudrock/core/Tooltip';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { Component } from './types';

interface ComponentRowProps {
  offeringComponent: Component;
  className?: string;
}

export const ComponentRow: React.FC<ComponentRowProps> = (props) => {
  const customer = useSelector(getCustomer);
  const activeFixedPriceProfile =
    customer && getActiveFixedPricePaymentProfile(customer.payment_profiles);

  return (
    <tr>
      <td>
        <p className="form-control-static">
          {props.offeringComponent.name}
          <Tooltip
            label={props.offeringComponent.type}
            id="componentTypeTooltip"
          >
            {' '}
            <i className="fa fa-question-circle" />
          </Tooltip>
        </p>
      </td>
      <td className={props.className}>{props.children}</td>
      <td>
        <p className="form-control-static">
          {props.offeringComponent.measured_unit || 'N/A'}
        </p>
      </td>
      {!activeFixedPriceProfile
        ? props.offeringComponent.prices.map((price, innerIndex) => (
            <td key={innerIndex}>
              <p className="form-control-static">
                {formatCurrency(
                  price,
                  ENV.plugins.CLOUDROCK_CORE.CURRENCY_NAME,
                  3,
                )}
              </p>
            </td>
          ))
        : null}
    </tr>
  );
};
