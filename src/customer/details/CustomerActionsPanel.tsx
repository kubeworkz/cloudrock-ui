import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';

import { CustomerAccordion } from './CustomerAccordion';
import { CustomerErrorPanel } from './CustomerErrorPanel';
import { CustomerMarketplacePanel } from './CustomerMarketplacePanel';
import { CustomerRemovePanel } from './CustomerRemovePanel';

export const CustomerActionsPanel: FunctionComponent = () => (
  <CustomerAccordion
    title={translate('Organization actions')}
    subtitle={translate(
      'Register organization as service provider and remove organization.',
    )}
  >
    <CustomerMarketplacePanel />
    <CustomerErrorPanel />
    <CustomerRemovePanel />
  </CustomerAccordion>
);
