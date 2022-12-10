import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { validateState } from '@cloudrock/resource/actions/base';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const EditNetworkDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "EditNetworkDialog" */ './EditNetworkDialog'),
  'EditNetworkDialog',
);

const validators = [validateState('OK')];

export const EditNetworkAction = ({ resource }) => (
  <DialogActionItem
    validators={validators}
    title={translate('Edit')}
    modalComponent={EditNetworkDialog}
    resource={resource}
  />
);
