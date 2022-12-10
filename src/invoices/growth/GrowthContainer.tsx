import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { GrowthChart } from '@cloudrock/invoices/growth/GrowthChart';
import { GrowthFilter } from '@cloudrock/invoices/growth/GrowthFilter';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { useTitle } from '@cloudrock/navigation/title';

export const GrowthContainer: FunctionComponent = () => {
  useTitle(translate('Growth'));
  useReportingBreadcrumbs();
  return (
    <>
      <GrowthFilter />
      <GrowthChart />
    </>
  );
};
