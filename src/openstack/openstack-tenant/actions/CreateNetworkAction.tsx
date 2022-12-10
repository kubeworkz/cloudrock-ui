import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { TenantActionProps } from './types';

const CreateNetworkDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateNetworkDialog" */ './CreateNetworkDialog'
    ),
  'CreateNetworkDialog',
);

const validators = [validateState('OK')];

export const CreateNetworkAction: FC<TenantActionProps> = ({ resource }) => (
  <DialogActionButton
    title={translate('Create')}
    icon="fa fa-plus"
    modalComponent={CreateNetworkDialog}
    resource={resource}
    validators={validators}
  />
);
