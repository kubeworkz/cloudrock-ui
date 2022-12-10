import { FC } from 'react';

import { translate } from '@cloudrock/i18n';
import { pullTenantFloatingIps } from '@cloudrock/openstack/api';
import { AsyncActionButton } from '@cloudrock/resource/actions/AsyncActionButton';
import { validateState } from '@cloudrock/resource/actions/base';

import { TenantActionProps } from './types';

const validators = [validateState('OK')];

export const PullFloatingIpsAction: FC<TenantActionProps> = ({ resource }) => (
  <AsyncActionButton
    title={translate('Synchronise')}
    icon="fa fa-refresh"
    resource={resource}
    validators={validators}
    apiMethod={pullTenantFloatingIps}
  />
);
