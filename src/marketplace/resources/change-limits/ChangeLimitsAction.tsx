import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const ChangeLimitsDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "ChangeLimitsDialog" */ './ChangeLimitsDialog'),
  'ChangeLimitsDialog',
);

const validators = [validateState('OK')];

export const ChangeLimitsAction = ({ resource }) =>
  resource.is_limit_based ? (
    <DialogActionItem
      validators={validators}
      title={translate('Change limits')}
      dialogSize="lg"
      modalComponent={ChangeLimitsDialog}
      resource={resource}
    />
  ) : null;
