import { useMemo, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import {
  getUser,
  checkCustomerUser,
  checkIsServiceManager,
} from '@cloudrock/workspace/selectors';

export const SelectOrganizationButton: FunctionComponent<{ organization }> = ({
  organization,
}) => {
  const user = useSelector(getUser);
  const canGotoDashboard = useMemo(
    () =>
      user.is_support ||
      checkCustomerUser(organization, user) ||
      checkIsServiceManager(organization, user),
    [organization, user],
  );
  if (!canGotoDashboard) {
    return null;
  }
  return (
    <Link
      className="btn btn-xs btn-default pull-right"
      state="organization.dashboard"
      params={{ uuid: organization.uuid }}
    >
      {translate('Select')}
    </Link>
  );
};
