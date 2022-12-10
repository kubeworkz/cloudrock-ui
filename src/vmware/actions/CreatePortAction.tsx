import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

const CreatePortDialog = lazyComponent(
  () => import(/* webpackChunkName: "CreatePortDialog" */ './CreatePortDialog'),
  'CreatePortDialog',
);

const validators = [validateState('OK')];

export const CreatePortAction: FC<any> = ({ resource }) => (
  <DialogActionButton
    title={translate('Create Network adapter')}
    icon="fa fa-plus"
    modalComponent={CreatePortDialog}
    resource={resource}
    validators={validators}
  />
);
