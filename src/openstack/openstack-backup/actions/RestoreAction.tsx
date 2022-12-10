import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const BackupRestoreDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackupRestoreDialog" */ './BackupRestoreDialog'
    ),
  'BackupRestoreDialog',
);

const validators = [validateState('OK')];

export const RestoreAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Restore')}
    modalComponent={BackupRestoreDialog}
    resource={resource}
  />
);
