import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { useTitle } from '@cloudrock/navigation/title';

import { SupportUsageFilter } from './SupportUsageFilter';
import { SupportUsageList } from './SupportUsageList';

export const SupportUsageContainer: FunctionComponent = () => {
  useTitle(translate('Usage reports'));
  useReportingBreadcrumbs();
  return (
    <Panel>
      <SupportUsageFilter />
      <SupportUsageList />
    </Panel>
  );
};
