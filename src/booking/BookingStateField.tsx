import { FunctionComponent } from 'react';

import { StateIndicator } from '@cloudrock/core/StateIndicator';
import { translate } from '@cloudrock/i18n';

export const bookingStateAliases = (state: string): string => {
  switch (state) {
    case 'Creating': {
      return translate('Unconfirmed');
    }
    case 'OK': {
      return translate('Accepted');
    }
    case 'Terminated': {
      return translate('Rejected');
    }
    default: {
      return state;
    }
  }
};

export const BookingStateField: FunctionComponent<{ row }> = ({ row }) => {
  const state = bookingStateAliases(row.state);
  return (
    <StateIndicator
      label={state}
      variant={
        state === 'Rejected'
          ? 'danger'
          : state === 'Unconfirmed'
          ? 'warning'
          : 'primary'
      }
      active={state === 'Unconfirmed'}
    />
  );
};
