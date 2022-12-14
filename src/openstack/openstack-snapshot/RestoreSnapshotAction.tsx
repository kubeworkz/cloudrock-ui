import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const RestoreSnapshotDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "RestoreSnapshotDialog" */ './RestoreSnapshotDialog'
    ),
  'RestoreSnapshotDialog',
);

const validators = [validateState('OK')];

export const RestoreSnapshotAction = ({ resource }) => (
  <DialogActionItem
    title={translate('Restore')}
    validators={validators}
    modalComponent={RestoreSnapshotDialog}
    resource={resource}
  />
);
