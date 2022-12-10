import { FunctionComponent } from 'react';

import { StateIndicator } from '@cloudrock/core/StateIndicator';
import { translate } from '@cloudrock/i18n';

export const PermissionRequestStateField: FunctionComponent<{ row }> = ({
  row,
}) => {
  const state = row.state;
  return (
    <StateIndicator
      label={translate(state)}
      variant={
        state === 'rejected'
          ? 'danger'
          : state === 'pending'
          ? 'warning'
          : 'primary'
      }
    />
  );
};
