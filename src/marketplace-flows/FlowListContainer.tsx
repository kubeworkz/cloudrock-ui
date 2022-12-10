import { Panel } from '@cloudrock/core/Panel';

import { FlowListFilter } from './FlowListFilter';
import { FlowsList } from './FlowsList';

export const FlowListContainer = () => (
  <Panel>
    <FlowListFilter />
    <FlowsList />
  </Panel>
);
