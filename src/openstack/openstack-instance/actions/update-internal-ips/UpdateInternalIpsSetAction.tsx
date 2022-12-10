import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { OpenStackInstance } from '../../types';

const UpdateInternalIpsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "UpdateInternalIpsDialog" */ './UpdateInternalIpsDialog'
    ),
  'UpdateInternalIpsDialog',
);

interface UpdateInternalIpsActionProps {
  resource: OpenStackInstance;
}

const validators = [validateState('OK')];

export const UpdateInternalIpsAction: FC<UpdateInternalIpsActionProps> = ({
  resource,
}) => (
  <DialogActionButton
    title={translate('Configure')}
    icon="fa fa-wrench"
    modalComponent={UpdateInternalIpsDialog}
    resource={resource}
    validators={validators}
  />
);
