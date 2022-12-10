import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { SharedProviderFilterContainer } from './SharedProviderFilter';
import { SharedProviderTabsContainer } from './SharedProviderTabs';

export const SharedProviderContainer: FunctionComponent = () => {
  useTitle(translate('Shared providers'));
  return (
    <>
      <SharedProviderFilterContainer />
      <SharedProviderTabsContainer />
    </>
  );
};
