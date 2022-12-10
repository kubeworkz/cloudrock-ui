import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { SupportResourcesFilter } from './SupportResourcesFilter';
import { SupportResourcesList } from './SupportResourcesList';

export const SupportResourcesContainer: FunctionComponent = () => {
  useTitle(translate('Resources'));
  return (
    <Panel>
      <SupportResourcesFilter />
      <SupportResourcesList />
    </Panel>
  );
};
