import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const EditDialog = lazyComponent(
  () => import(/* webpackChunkName: "EditDialog" */ './EditDialog'),
  'EditDialog',
);

const validators = [validateState('OK')];

export const EditAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Edit')}
    modalComponent={EditDialog}
    resource={resource}
  />
);
