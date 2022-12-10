import { translate } from '@cloudrock/i18n';
import { startInstance } from '@cloudrock/openstack/api';
import { OpenStackInstance } from '@cloudrock/openstack/openstack-instance/types';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateState,
  validateRuntimeState,
} from '@cloudrock/resource/actions/base';
import { ActionContext } from '@cloudrock/resource/actions/types';

function validate(ctx: ActionContext<OpenStackInstance>): string {
  if (ctx.resource.state === 'OK' && ctx.resource.runtime_state === 'ACTIVE') {
    return translate('Instance is already active.');
  }
}

const validators = [
  validate,
  validateState('OK'),
  validateRuntimeState('SHUTOFF'),
];

export const StartAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Start')}
    resource={resource}
    validators={validators}
    apiMethod={startInstance}
  />
);
