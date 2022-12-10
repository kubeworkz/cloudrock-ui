import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { User } from '@cloudrock/workspace/types';

import { Invitation } from './types';

export const InvitationMessage: FunctionComponent<{
  invitation: Invitation;
  user: User;
}> = ({ invitation, user }) => (
  <>
    <p>
      {translate(
        '{sender} has invited you to join {name} {type} in {role} role.',
        {
          sender:
            invitation.created_by_full_name || invitation.created_by_username,
          name: invitation.customer_name || invitation.project_name,
          type: invitation.project_name
            ? translate('project')
            : translate('organization'),
          role: translate(
            ENV.roles[invitation.project_role || invitation.customer_role],
          ),
        },
      )}
    </p>
    {user.email.toLowerCase() !== invitation.email.toLowerCase() ? (
      <>
        <p>
          {translate('Your current email is:')} <strong>{user.email}</strong>
        </p>
        <p>
          {translate('Invitation email is:')}{' '}
          <strong>{invitation.email}</strong>
        </p>
        <p>
          {translate(
            'Would you like to update your current email with the one from the invitation?',
          )}
        </p>
      </>
    ) : null}
  </>
);
