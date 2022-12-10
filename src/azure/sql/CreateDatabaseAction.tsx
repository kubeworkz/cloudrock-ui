import { FC } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

const CreateDatabaseDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateDatabaseDialog" */ './CreateDatabaseDialog'
    ),
  'CreateDatabaseDialog',
);

const validators = [validateState('OK')];

export const CreateDatabaseAction: FC<any> = ({ resource }) => (
  <DialogActionButton
    title={translate('Create')}
    icon="fa fa-plus"
    modalComponent={CreateDatabaseDialog}
    resource={resource}
    validators={validators}
  />
);
