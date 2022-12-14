import { FunctionComponent } from 'react';

import { StateIndicator, StateVariant } from '@cloudrock/core/StateIndicator';

export type PaymentStateType = 'Erred' | 'Approved' | 'Created' | 'Cancelled';

const LABEL_CLASSES: { [key in PaymentStateType]: StateVariant } = {
  Erred: 'warning',
  Approved: 'primary',
  Created: 'primary',
  Cancelled: 'plain',
};

interface PaymentStateIndicatorProps {
  payment: {
    state: PaymentStateType;
  };
}

export const PaymentStateIndicator: FunctionComponent<PaymentStateIndicatorProps> =
  (props) => (
    <StateIndicator
      label={props.payment.state}
      variant={LABEL_CLASSES[props.payment.state] || 'info'}
      active={props.payment.state === 'Created'}
    />
  );
