import { FunctionComponent, useMemo } from 'react';

import { OfferingNamesManagedByUser } from '@cloudrock/customer/team/OfferingNamesManagedByUser';
import { ProjectRolesList } from '@cloudrock/customer/team/ProjectRolesList';
import { getRoles } from '@cloudrock/customer/team/utils';
import { translate } from '@cloudrock/i18n';

export const CustomerUsersListExpandableRow: FunctionComponent<any> = ({
  row,
}) => {
  const roles = useMemo(getRoles, []);
  return (
    <>
      {roles.map((role) => (
        <p key={role.value}>
          <b>{translate('{label} in:', role)}</b>{' '}
          <ProjectRolesList roleName={role.value} row={row} />
        </p>
      ))}
      {row.is_service_manager && (
        <p>
          <b>{translate('Service manager of:')}</b>{' '}
          <OfferingNamesManagedByUser userUuid={row.uuid} />
        </p>
      )}
    </>
  );
};
