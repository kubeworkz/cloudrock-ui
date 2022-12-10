import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const SetMtuDialog = lazyComponent(
  () => import(/* webpackChunkName: "SetMtuDialog" */ './SetMtuDialog'),
  'SetMtuDialog',
);

const validators = [validateState('OK')];

export const SetMtuAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Set MTU')}
    modalComponent={SetMtuDialog}
    resource={resource}
  />
);
