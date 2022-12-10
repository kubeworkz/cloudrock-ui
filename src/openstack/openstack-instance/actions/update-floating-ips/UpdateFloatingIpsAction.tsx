import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const UpdateFloatingIpsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "UpdateFloatingIpsDialog" */ './UpdateFloatingIpsDialog'
    ),
  'UpdateFloatingIpsDialog',
);

const validators = [validateState('OK')];

export const UpdateFloatingIpsAction = ({ resource }) => (
  <DialogActionItem
    resource={resource}
    title={translate('Update floating IPs')}
    validators={validators}
    modalComponent={UpdateFloatingIpsDialog}
  />
);
