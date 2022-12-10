import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const Illustration = require('@cloudrock/images/table-placeholders/undraw_empty_xct9.svg');

export const HookListTablePlaceholder: FunctionComponent = () => (
  <ImageTablePlaceholder
    illustration={Illustration}
    title={translate('You have no notifications yet.')}
    description={translate(
      'Notifications allow to be informed when a certain event has occurred.',
    )}
  />
);
