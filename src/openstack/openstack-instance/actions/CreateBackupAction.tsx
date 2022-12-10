import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { RESOURCE_ACTION_FORM } from '@cloudrock/resource/actions/constants';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { OpenStackInstance } from '../types';

const CreateBackupDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "CreateBackupDialog" */ './CreateBackupDialog'),
  'CreateBackupDialog',
);

interface CreateBackupActionProps {
  resource: OpenStackInstance;
}

const validators = [validateState('OK')];

export const CreateBackupAction: FC<CreateBackupActionProps> = ({
  resource,
}) => (
  <DialogActionButton
    title={translate('Create')}
    icon="fa fa-plus"
    modalComponent={CreateBackupDialog}
    formId={RESOURCE_ACTION_FORM}
    resource={resource}
    validators={validators}
  />
);
