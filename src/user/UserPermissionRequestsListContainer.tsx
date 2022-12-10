import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { UserPermissionRequestsList } from '@cloudrock/user/UserPermissionRequestsList';
import { UserPermissionRequestsListFilter } from '@cloudrock/user/UserPermissionRequestsListFilter';

export const UserPermissionRequestsListContainer: FunctionComponent = () => {
  useTitle(translate('Permission requests'));
  return (
    <>
      <UserPermissionRequestsListFilter />
      <UserPermissionRequestsList />
    </>
  );
};
