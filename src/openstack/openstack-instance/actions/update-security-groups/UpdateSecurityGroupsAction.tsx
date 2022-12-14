import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const UpdateSecurityGroupsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "UpdateSecurityGroupsDialog" */ './UpdateSecurityGroupsDialog'
    ),
  'UpdateSecurityGroupsDialog',
);

const validators = [validateState('OK')];

export const UpdateSecurityGroupsAction = ({ resource }) => (
  <DialogActionItem
    resource={resource}
    title={translate('Update security groups')}
    validators={validators}
    modalComponent={UpdateSecurityGroupsDialog}
  />
);
