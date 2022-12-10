import { FC } from 'react';

import { translate } from '@cloudrock/i18n';
import { createFloatingIp } from '@cloudrock/openstack/api';
import { OpenStackTenant } from '@cloudrock/openstack/openstack-tenant/types';
import { AsyncActionButton } from '@cloudrock/resource/actions/AsyncActionButton';
import { validateState } from '@cloudrock/resource/actions/base';
import { ActionContext } from '@cloudrock/resource/actions/types';

import { TenantActionProps } from './types';

function checkExternalNetwork(ctx: ActionContext<OpenStackTenant>): string {
  if (!ctx.resource.external_network_id) {
    return translate(
      'Cannot create floating IP if tenant external network is not defined.',
    );
  }
}

const validators = [validateState('OK'), checkExternalNetwork];

export const CreateFloatingIpAction: FC<TenantActionProps> = ({ resource }) => (
  <AsyncActionButton
    title={translate('Create')}
    icon="fa fa-plus"
    resource={resource}
    validators={validators}
    apiMethod={createFloatingIp}
  />
);
