import { translate } from '@cloudrock/i18n';
import { stopInstance } from '@cloudrock/openstack/api';
import { OpenStackInstance } from '@cloudrock/openstack/openstack-instance/types';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateState,
  validateRuntimeState,
} from '@cloudrock/resource/actions/base';
import { ActionContext } from '@cloudrock/resource/actions/types';

function validate(ctx: ActionContext<OpenStackInstance>): string {
  if (ctx.resource.state === 'OK' && ctx.resource.runtime_state === 'SHUTOFF') {
    return translate('Instance is already stopped.');
  }
}

const validators = [
  validate,
  validateState('OK'),
  validateRuntimeState('ACTIVE'),
];

export const StopAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Stop')}
    resource={resource}
    validators={validators}
    apiMethod={stopInstance}
  />
);
