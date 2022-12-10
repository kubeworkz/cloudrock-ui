import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { VolumeActionProps } from './VolumeActionProps';

const CreateSnapshotDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateSnapshotDialog" */ './CreateSnapshotDialog'
    ),
  'CreateSnapshotDialog',
);

const validators = [validateState('OK')];

export const CreateSnapshotAction: FC<VolumeActionProps> = ({ resource }) => (
  <DialogActionButton
    title={translate('Create')}
    icon="fa fa-plus"
    modalComponent={CreateSnapshotDialog}
    resource={resource}
    validators={validators}
  />
);
