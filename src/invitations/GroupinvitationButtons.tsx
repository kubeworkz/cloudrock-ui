import { Button } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';

export const GroupInvitationButtons = ({ dismiss, submitRequest }) => (
  <>
    <Button bsStyle="primary" onClick={submitRequest}>
      {translate('Submit')}
    </Button>
    <Button onClick={dismiss}>{translate('Cancel')}</Button>
  </>
);
