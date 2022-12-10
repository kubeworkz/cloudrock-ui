import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

const CreateDiskDialog = lazyComponent(
  () => import(/* webpackChunkName: "CreateDiskDialog" */ './CreateDiskDialog'),
  'CreateDiskDialog',
);

const validators = [validateState('OK')];

export const CreateDiskAction: FC<any> = ({ resource }) => (
  <DialogActionButton
    title={translate('Create disk')}
    icon="fa fa-plus"
    modalComponent={CreateDiskDialog}
    resource={resource}
    validators={validators}
  />
);
