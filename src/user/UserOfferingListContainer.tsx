import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { UserOfferingList } from '@cloudrock/user/UserOfferingList';

export const UserOfferingListContainer: FunctionComponent = () => {
  useTitle(translate('Remote accounts'));
  return <UserOfferingList />;
};
