import { translate } from '@cloudrock/i18n';
import { restartInstance } from '@cloudrock/openstack/api';
import { OpenStackInstance } from '@cloudrock/openstack/openstack-instance/types';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateState,
  validateRuntimeState,
} from '@cloudrock/resource/actions/base';
import { ActionContext } from '@cloudrock/resource/actions/types';

function validate(ctx: ActionContext<OpenStackInstance>): string {
  if (ctx.resource.state === 'OK' && ctx.resource.runtime_state === 'SHUTOFF') {
    return translate('Please start instance first.');
  }
}

const validators = [
  validate,
  validateState('OK'),
  validateRuntimeState('ACTIVE'),
];

export const RestartAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Restart')}
    resource={resource}
    validators={validators}
    apiMethod={restartInstance}
  />
);
