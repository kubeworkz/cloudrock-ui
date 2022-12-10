import { FunctionComponent } from 'react';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { PriceList } from './PriceList';

export const PriceListContainer: FunctionComponent = () => {
  useTitle(translate('Pricelist'));
  return (
    <Panel>
      <PriceList />
    </Panel>
  );
};
