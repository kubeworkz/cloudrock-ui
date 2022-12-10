import { FC } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Cluster } from '@cloudrock/rancher/types';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

const CreateNodeDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateNodeDialog" */ '../create/CreateNodeDialog'
    ),
  'CreateNodeDialog',
);

export const CreateNodeAction: FC<{ resource: Cluster }> = ({ resource }) =>
  !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE &&
  Boolean(resource.tenant_settings) ? (
    <DialogActionButton
      title={translate('Create node')}
      icon="fa fa-plus"
      modalComponent={CreateNodeDialog}
      resource={resource}
    />
  ) : null;
