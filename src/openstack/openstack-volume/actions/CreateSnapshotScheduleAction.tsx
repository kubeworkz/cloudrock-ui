import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { VolumeActionProps } from './VolumeActionProps';

const CreateSnapshotScheduleDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateSnapshotScheduleDialog" */ './CreateSnapshotScheduleDialog'
    ),
  'CreateSnapshotScheduleDialog',
);

const validators = [validateState('OK')];

export const CreateSnapshotScheduleAction: FC<VolumeActionProps> = ({
  resource,
}) => (
  <DialogActionButton
    title={translate('Create')}
    icon="fa fa-plus"
    modalComponent={CreateSnapshotScheduleDialog}
    resource={resource}
    validators={validators}
  />
);
