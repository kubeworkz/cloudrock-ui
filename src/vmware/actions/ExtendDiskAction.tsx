import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const ExtendDiskDialog = lazyComponent(
  () => import(/* webpackChunkName: "ExtendDiskDialog" */ './ExtendDiskDialog'),
  'ExtendDiskDialog',
);

const validators = [validateState('OK')];

export const ExtendDiskAction = ({ resource }) => (
  <DialogActionItem
    modalComponent={ExtendDiskDialog}
    title={translate('Extend')}
    validators={validators}
    resource={resource}
  />
);
