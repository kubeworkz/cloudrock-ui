import { useSelector } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { OpenStackInstance } from '@cloudrock/openstack/openstack-instance/types';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';
import { ActionContext } from '@cloudrock/resource/actions/types';
import { getUser } from '@cloudrock/workspace/selectors';

const RancherClusterKubeconfigDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "RancherClusterKubeconfigDialog" */ './RancherClusterKubeconfigDialog'
    ),
  'RancherClusterKubeconfigDialog',
);

function validate(ctx: ActionContext<OpenStackInstance>): string {
  if (ctx.resource.state !== 'OK') {
    return translate('Instance should be OK. Please contact support.');
  }
}

const validators = [validate];

export const KubeconfigFileAction = ({ resource }) => {
  const user = useSelector(getUser);
  if (!user.is_staff) {
    return null;
  }
  return (
    <DialogActionItem
      title={translate('Generate Kubeconfig file')}
      modalComponent={RancherClusterKubeconfigDialog}
      resource={resource}
      validators={validators}
    />
  );
};
