import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { StepsList } from '@cloudrock/marketplace/common/StepsList';

import { OrderStep } from './types';

interface OrderStepsProps {
  step: OrderStep;
}

const STEPS = ['Configure', 'Approve', 'Review'];

const getTabLabel = (tab: string) =>
  ({
    Configure: translate('Configure'),
    Approve: translate('Approve'),
    Review: translate('Review'),
  }[tab] || tab);

export const OrderSteps: FunctionComponent<OrderStepsProps> = (props) => (
  <StepsList choices={STEPS} value={props.step} getTabLabel={getTabLabel} />
);
