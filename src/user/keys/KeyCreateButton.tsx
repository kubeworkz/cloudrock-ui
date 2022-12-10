import { useRouter } from '@uirouter/react';
import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n/translate';
import { ActionButton } from '@cloudrock/table/ActionButton';

export const KeyCreateButton: FunctionComponent = () => {
  const router = useRouter();

  return (
    <ActionButton
      title={translate('Add key')}
      action={() => router.stateService.go('keys.create')}
      icon="fa fa-plus"
    />
  );
};
