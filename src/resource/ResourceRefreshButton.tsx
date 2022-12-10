import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';

export const ResourceRefreshButton: FunctionComponent<{ refreshResource }> = ({
  refreshResource,
}) => (
  <ActionButton
    title={translate('Refresh')}
    icon="fa fa-refresh"
    action={refreshResource}
  />
);
