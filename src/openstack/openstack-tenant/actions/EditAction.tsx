import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

import { userCanModifyTenant } from './utils';

const EditDialog = lazyComponent(
  () => import(/* webpackChunkName: "EditDialog" */ './EditDialog'),
  'EditDialog',
);

const validators = [userCanModifyTenant];

export const EditAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Edit')}
    modalComponent={EditDialog}
    resource={resource}
  />
);
