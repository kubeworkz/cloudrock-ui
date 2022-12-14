import { useDispatch, useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { waitForConfirmation } from '@cloudrock/modal/actions';
import { unlinkInstance } from '@cloudrock/rancher/api';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { getUser } from '@cloudrock/workspace/selectors';

export const UnlinkAction = ({ resource }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const callback = async () => {
    try {
      await waitForConfirmation(
        dispatch,
        translate('Unlink instance'),
        translate('Do you want to unlink instance {name}?', {
          name: resource.instance_name,
        }),
      );
    } catch {
      return;
    }

    try {
      await unlinkInstance(resource.uuid);
      dispatch(
        showSuccess(
          translate('OpenStack instance has been unlinked from Rancher node.'),
        ),
      );
    } catch (e) {
      dispatch(
        showErrorResponse(e, translate('Unable to unlink instance from node.')),
      );
    }
  };
  if (
    resource.instance !== null &&
    user.is_staff &&
    !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE
  ) {
    return (
      <ActionItem title={translate('Unlink instance')} action={callback} />
    );
  }
  return null;
};
