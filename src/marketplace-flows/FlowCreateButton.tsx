import { triggerTransition } from '@uirouter/redux';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n/translate';
import { ActionButton } from '@cloudrock/table/ActionButton';

export const FlowCreateButton: FunctionComponent = () => {
  const dispatch = useDispatch();
  const callback = () =>
    dispatch(triggerTransition('marketplace-landing-user', {}));

  return (
    <ActionButton
      action={callback}
      title={translate('Add resource')}
      icon="fa fa-plus"
    />
  );
};
