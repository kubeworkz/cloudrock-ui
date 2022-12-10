import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { getUser } from '@cloudrock/workspace/selectors';

import { UserEditContainer } from './support/UserEditContainer';

export const UserManage: FunctionComponent = () => {
  useTitle(translate('Manage'));
  const user = useSelector(getUser);
  if (!user) {
    return <LoadingSpinner />;
  }
  return (
    <div className="row wrapper p-b-xl">
      <div className="col-lg-10">
        <UserEditContainer user={user} />
      </div>
    </div>
  );
};
