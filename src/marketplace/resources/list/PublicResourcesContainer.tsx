import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';

import { PublicResourcesFilter } from './PublicResourcesFilter';
import { PublicResourcesList } from './PublicResourcesList';

export const PublicResourcesContainer: FunctionComponent = () => {
  useTitle(translate('Public resources'));
  useSidebarKey('marketplace-services');
  return (
    <Panel>
      <PublicResourcesFilter />
      <PublicResourcesList />
    </Panel>
  );
};
