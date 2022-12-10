import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { OpenStackInstance } from '@cloudrock/openstack/openstack-instance/types';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';
import { ActionContext } from '@cloudrock/resource/actions/types';

const ForceDestroyDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "ForceDestroyDialog" */ './ForceDestroyDialog'),
  'ForceDestroyDialog',
);

function validate(ctx: ActionContext<OpenStackInstance>): string {
  if (ctx.resource.state === 'Erred') {
    return;
  }
  if (ctx.resource.state === 'OK') {
    return;
  }
  return translate('Instance should be OK, or erred. Please contact support.');
}

const validators = [validate];

export const ForceDestroyAction = ({ resource }) => (
  <DialogActionItem
    title={translate('Force destroy')}
    validators={validators}
    modalComponent={ForceDestroyDialog}
    className="text-danger"
    resource={resource}
  />
);
