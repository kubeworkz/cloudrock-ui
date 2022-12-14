import { FunctionComponent } from 'react';

import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { translate } from '@cloudrock/i18n';
import { OfferingComponent } from '@cloudrock/marketplace/types';

interface PlanProps {
  plan: any;
  components: Array<object>;
}

export const PlanSummary: FunctionComponent<PlanProps> = (props) => (
  <>
    <p>
      <strong>{translate('Plan name')}:</strong> {props.plan.name}
    </p>
    {props.plan.unit && (
      <p>
        <strong>{translate('Billing period')}:</strong> {props.plan.unit.label}
      </p>
    )}
    {(props.plan.quotas || props.plan.prices) && (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{/* Name */}</th>
            <th>{translate('Amount')}</th>
            <th>{translate('Price')}</th>
            <th>{translate('Units')}</th>
          </tr>
        </thead>
        <tbody>
          {props.components.map((component: OfferingComponent, index) => (
            <tr key={index}>
              <td>{component.name}</td>
              <td>
                {props.plan.quotas && component.billing_type === 'fixed'
                  ? props.plan.quotas[component.type]
                  : 'N/A'}
              </td>
              <td>
                {props.plan.prices &&
                (props.plan.prices[component.type] ||
                  props.plan.prices[component.type] === 0)
                  ? defaultCurrency(props.plan.prices[component.type])
                  : 'N/A'}
              </td>
              <td>{component.measured_unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
);
