import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { useTitle } from '@cloudrock/navigation/title';

import { PlanUsageFilter } from './PlanUsageFilter';
import { PlanUsageList } from './PlanUsageList';

export const PlanUsageContainer: FunctionComponent = () => {
  useTitle(translate('Plan capacity'));
  useReportingBreadcrumbs();
  return (
    <Panel>
      <PlanUsageFilter />
      <PlanUsageList />
    </Panel>
  );
};
