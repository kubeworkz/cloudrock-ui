import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { KeysList } from '@cloudrock/user/keys/KeysList';

export const KeysListContainer: FunctionComponent = () => {
  useTitle(translate('SSH keys'));
  return <KeysList />;
};
