import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const EditSubnetDialog = lazyComponent(
  () => import(/* webpackChunkName: "EditSubnetDialog" */ './EditSubnetDialog'),
  'EditSubnetDialog',
);

const validators = [validateState('OK')];

export const EditSubnetAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Edit')}
    modalComponent={EditSubnetDialog}
    resource={resource}
  />
);
