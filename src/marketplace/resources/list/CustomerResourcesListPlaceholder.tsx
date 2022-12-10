import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const illustration = require('@cloudrock/images/table-placeholders/undraw_data_report_bi6l.svg');

export const CustomerResourcesListPlaceholder: FunctionComponent = () => (
  <ImageTablePlaceholder
    illustration={illustration}
    title={translate(`Nothing to show here`)}
    description={translate(`Seems you don't have any resources yet`)}
  />
);
