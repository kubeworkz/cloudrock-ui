import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { CurrentUserEvents } from './CurrentUserEvents';

export const UserEventsWrapper: FunctionComponent = () => {
  useTitle(translate('Audit logs'));
  return <CurrentUserEvents />;
};
