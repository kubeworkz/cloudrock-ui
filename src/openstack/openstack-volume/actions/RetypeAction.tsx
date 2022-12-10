import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import {
  validateState,
  validateRuntimeState,
} from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const RetypeDialog = lazyComponent(
  () => import(/* webpackChunkName: "RetypeDialog" */ './RetypeDialog'),
  'RetypeDialog',
);

const validators = [validateRuntimeState('available'), validateState('OK')];

export const RetypeAction = ({ resource }) =>
  isFeatureVisible('openstack.volume_types') ? (
    <DialogActionItem
      title={translate('Retype')}
      validators={validators}
      modalComponent={RetypeDialog}
      resource={resource}
    />
  ) : null;
