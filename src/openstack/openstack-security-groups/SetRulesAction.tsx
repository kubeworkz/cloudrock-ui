import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const SecurityGroupEditorDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SecurityGroupEditorDialog" */ './SecurityGroupEditorDialog'
    ),
  'SecurityGroupEditorDialog',
);

const validators = [validateState('OK')];

export const SetRulesAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Set rules')}
    modalComponent={SecurityGroupEditorDialog}
    dialogSize="xl"
    resource={resource}
  />
);
