import { Panel } from '@cloudrock/core/Panel';

import { OrganizationProjectUpdateRequestListFilter } from './OrganizationProjectUpdateRequestListFilter';
import { OrganizationProjectUpdateRequestsList } from './OrganizationProjectUpdateRequestsList';

export const OrganizationProjectUpdateRequestListContainer = () => (
  <Panel>
    <OrganizationProjectUpdateRequestListFilter />
    <OrganizationProjectUpdateRequestsList />
  </Panel>
);
