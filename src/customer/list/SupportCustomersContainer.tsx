import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { SupportCustomerFilter } from '@cloudrock/customer/list/SupportCustomerFilter';
import { SupportCustomerList } from '@cloudrock/customer/list/SupportCustomerList';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

export const SupportCustomersContainer: FunctionComponent = () => {
  useTitle(translate('Organizations'));
  return (
    <Panel>
      <SupportCustomerFilter />
      <SupportCustomerList />
    </Panel>
  );
};
