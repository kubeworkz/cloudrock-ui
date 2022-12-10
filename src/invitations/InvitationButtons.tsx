import { Button } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';

export const InvitationButtons = ({
  user,
  invitation,
  dismiss,
  closeAcceptingNewEmail,
  closeDecliningNewEmail,
}) => (
  <>
    {user.email !== invitation.email ? (
      <>
        <Button bsStyle="primary" onClick={closeAcceptingNewEmail}>
          {translate('Yes, use invitation email')}
        </Button>
        <Button onClick={closeDecliningNewEmail}>
          {translate('No, continue using current email')}
        </Button>
      </>
    ) : (
      <Button bsStyle="primary" onClick={closeAcceptingNewEmail}>
        {translate('Accept invitation')}
      </Button>
    )}
    <Button onClick={dismiss}>{translate('Cancel invitation')}</Button>
  </>
);
