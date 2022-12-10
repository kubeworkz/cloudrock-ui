import { useTitle } from 'react-use';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';

import { CustomerCreateRequestsList } from './CustomerCreateRequestsList';
import { FlowListFilter } from './FlowListFilter';

export const CustomerRequestContainer = () => {
  useTitle(translate('Organization creation requests'));

  return (
    <Panel>
      <FlowListFilter />
      <CustomerCreateRequestsList />
    </Panel>
  );
};
