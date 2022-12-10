import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { RESOURCE_ACTION_FORM } from '@cloudrock/resource/actions/constants';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { OpenStackInstance } from '../types';

const CreateBackupScheduleDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateBackupScheduleDialog" */ './CreateBackupScheduleDialog'
    ),
  'CreateBackupScheduleDialog',
);

interface CreateBackupScheduleActionProps {
  resource: OpenStackInstance;
}

const validators = [validateState('OK')];

export const CreateBackupScheduleAction: FC<CreateBackupScheduleActionProps> =
  ({ resource }) => (
    <DialogActionButton
      title={translate('Create')}
      icon="fa fa-plus"
      modalComponent={CreateBackupScheduleDialog}
      formId={RESOURCE_ACTION_FORM}
      resource={resource}
      validators={validators}
    />
  );
