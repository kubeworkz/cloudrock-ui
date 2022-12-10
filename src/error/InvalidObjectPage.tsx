import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { goBack } from '@cloudrock/navigation/utils';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_empty_xct9.svg');

export const InvalidObjectPage: FunctionComponent = () => {
  useTitle(translate('Page is not found.'));
  return (
    <ImageTablePlaceholder
      illustration={Illustration}
      title={translate(`Page is not found.`)}
      description={translate(
        `You've either entered invalid URL or don't have enough permissions to view this page.`,
      )}
      action={<Button onClick={goBack}>&lt; {translate('Back')}</Button>}
    />
  );
};
