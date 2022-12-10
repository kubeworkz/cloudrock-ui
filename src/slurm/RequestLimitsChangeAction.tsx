import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const RequestLimitsChangeDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "RequestLimitsChangeDialog" */ './RequestLimitsChangeDialog'
    ),
  'RequestLimitsChangeDialog',
);

export const RequestLimitsChangeAction = ({ resource }) => (
  <DialogActionItem
    title={translate('Request limits change')}
    modalComponent={RequestLimitsChangeDialog}
    resource={resource}
  />
);
