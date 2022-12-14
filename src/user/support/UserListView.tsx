import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { UserFilter } from './UserFilter';
import { UserList } from './UserList';

export const UserListView: FunctionComponent = () => {
  useTitle(translate('Users'));
  return (
    <>
      <div className="ibox-content m-b-sm border-bottom">
        <UserFilter />
      </div>
      <div className="ibox-content">
        <UserList />
      </div>
    </>
  );
};
