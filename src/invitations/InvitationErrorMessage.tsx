import { Button } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_empty_xct9.svg');

export const InvitationErrorMessage = ({ dismiss }) => (
  <ImageTablePlaceholder
    illustration={Illustration}
    title={translate('Invitation is not valid')}
    description={translate(
      `You've either entered invalid URL or don't have enough permissions to view this page.`,
    )}
    action={<Button onClick={dismiss}>{translate('Go to profile')}</Button>}
  />
);
