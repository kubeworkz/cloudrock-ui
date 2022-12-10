import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateStaffAction } from '@cloudrock/marketplace/resources/actions/utils';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const SetLimitsDialog = lazyComponent(
  () => import(/* webpackChunkName: "SetLimitsDialog" */ './SetLimitsDialog'),
  'SetLimitsDialog',
);

const validators = [validateState('OK'), validateStaffAction];

export const SetLimitsAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Set limits')}
    modalComponent={SetLimitsDialog}
    resource={resource}
  />
);
