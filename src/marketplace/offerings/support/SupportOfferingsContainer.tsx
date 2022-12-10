import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useReportingBreadcrumbs } from '@cloudrock/issues/workspace/SupportWorkspace';
import { useTitle } from '@cloudrock/navigation/title';

import { SupportOfferingsFilter } from './SupportOfferingsFilter';
import { SupportOfferingsList } from './SupportOfferingsList';

export const SupportOfferingsContainer: FunctionComponent = () => {
  useTitle(translate('Offerings'));
  useReportingBreadcrumbs();
  return (
    <Panel>
      <SupportOfferingsFilter />
      <SupportOfferingsList />
    </Panel>
  );
};
