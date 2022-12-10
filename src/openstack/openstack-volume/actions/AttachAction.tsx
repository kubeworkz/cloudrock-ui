import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateRuntimeState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const AttachDialog = lazyComponent(
  () => import(/* webpackChunkName: "AttachDialog" */ './AttachDialog'),
  'AttachDialog',
);

const validators = [validateRuntimeState('available')];

export const AttachAction = ({ resource }) => (
  <DialogActionItem
    title={translate('Attach')}
    validators={validators}
    modalComponent={AttachDialog}
    resource={resource}
  />
);
