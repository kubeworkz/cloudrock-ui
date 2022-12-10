import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { formatRole, getUUID } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';

export const RoleField: FunctionComponent<{ invitation }> = ({
  invitation,
}) => {
  if (invitation.project_role) {
    if (!invitation.project) {
      return <>{formatRole(invitation.project_role)}</>;
    }
    return (
      <Link
        state="project.details"
        params={{ uuid: getUUID(invitation.project) }}
        label={translate('{role} in {project}', {
          role: formatRole(invitation.project_role),
          project: invitation.project_name,
        })}
      />
    );
  }
  return null;
};
