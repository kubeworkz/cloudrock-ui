import { FunctionComponent } from 'react';

import { CustomersDivisionsChart } from '@cloudrock/customer/divisions/CustomersDivisionsChart';
import { CustomersDivisionsFilter } from '@cloudrock/customer/divisions/CustomersDivisionsFilter';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

export const CustomersDivisionsContainer: FunctionComponent = () => {
  useTitle(translate('Organizations divisions'));
  return (
    <>
      <CustomersDivisionsFilter />
      <CustomersDivisionsChart />
    </>
  );
};
