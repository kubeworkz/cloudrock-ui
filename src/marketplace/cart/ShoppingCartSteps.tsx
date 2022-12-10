import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { StepsList } from '@cloudrock/marketplace/common/StepsList';

export const ShoppingCartSteps: FunctionComponent = () => (
  <StepsList
    choices={[
      translate('Configure'),
      translate('Approve'),
      translate('Review'),
    ]}
    value={translate('Configure')}
  />
);
