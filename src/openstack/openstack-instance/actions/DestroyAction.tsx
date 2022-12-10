import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { OpenStackInstance } from '@cloudrock/openstack/openstack-instance/types';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';
import { ActionContext } from '@cloudrock/resource/actions/types';

const DestroyDialog = lazyComponent(
  () => import(/* webpackChunkName: "DestroyDialog" */ './DestroyDialog'),
  'DestroyDialog',
);

function validate(ctx: ActionContext<OpenStackInstance>): string {
  if (ctx.resource.state === 'Erred') {
    return;
  }
  if (ctx.resource.state === 'OK' && ctx.resource.runtime_state === 'SHUTOFF') {
    return;
  }
  if (ctx.resource.state === 'OK' && ctx.resource.runtime_state === 'ACTIVE') {
    return translate('Please stop the instance before its removal.');
  }
  return translate(
    'Instance should be shutoff and OK or erred. Please contact support.',
  );
}

const validators = [validate];

export const DestroyAction = ({ resource }) => (
  <DialogActionItem
    title={translate('Destroy')}
    validators={validators}
    className="text-danger"
    resource={resource}
    modalComponent={DestroyDialog}
  />
);
