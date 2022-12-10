import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { DialogActionItem } from '@cloudrock/resource/actions/DialogActionItem';
import { getUser } from '@cloudrock/workspace/selectors';

const LinkDialog = lazyComponent(
  () => import(/* webpackChunkName: "LinkDialog" */ './LinkDialog'),
  'LinkDialog',
);

export const LinkAction = ({ resource }) => {
  const user = useSelector(getUser);
  if (
    !resource.instance &&
    user.is_staff &&
    !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE
  ) {
    return (
      <DialogActionItem
        title={translate('Link OpenStack Instance')}
        modalComponent={LinkDialog}
        resource={resource}
      />
    );
  }
  return null;
};
