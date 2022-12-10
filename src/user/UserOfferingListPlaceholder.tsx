import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_empty_xct9.svg');

export const UserOfferingListPlaceholder: FunctionComponent = () => (
  <ImageTablePlaceholder
    illustration={Illustration}
    title={translate(`There are no remote accounts yet.`)}
    description={translate(
      `Remote accounts are used for accessing external services you have access to.`,
    )}
  />
);
