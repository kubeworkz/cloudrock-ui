import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';

const RequestDirectAccessDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "RequestDirectAccessDialog" */ './RequestDirectAccessDialog'
    ),
  'RequestDirectAccessDialog',
);

export const RequestDirectAccessAction = ({ resource }) =>
  !ENV.plugins.CLOUDROCK_OPENSTACK.TENANT_CREDENTIALS_VISIBLE ? (
    <DialogActionItem
      title={translate('Request direct access')}
      modalComponent={RequestDirectAccessDialog}
      resource={resource}
    />
  ) : null;
