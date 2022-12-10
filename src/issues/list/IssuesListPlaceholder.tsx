import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_empty_xct9.svg');

export const IssuesListPlaceholder: FunctionComponent = () => (
  <ImageTablePlaceholder
    illustration={Illustration}
    title={translate(`You haven't created any issues yet.`)}
    description={translate(`Issues are trackable requests to the operator.`)}
  />
);
