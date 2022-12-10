import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { SupportOrdersList } from '@cloudrock/marketplace/orders/item/list/SupportOrdersList';
import { SupportOrdersListFilter } from '@cloudrock/marketplace/orders/item/list/SupportOrdersListFilter';
import { useTitle } from '@cloudrock/navigation/title';

export const SupportOrdersContainer: FunctionComponent = () => {
  useTitle(translate('Orders'));
  useReportingBreadcrumbs();
  return (
    <Panel>
      <SupportOrdersListFilter />
      <SupportOrdersList />
    </Panel>
  );
};
