import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const CreateSubnetDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "CreateSubnetDialog" */ './CreateSubnetDialog'),
  'CreateSubnetDialog',
);

const validators = [validateState('OK')];

export const CreateSubnetAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Create subnet')}
    modalComponent={CreateSubnetDialog}
    resource={resource}
  />
);
