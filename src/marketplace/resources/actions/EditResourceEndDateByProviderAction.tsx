import { useDispatch, useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { updateResourceEndDateByProvider } from '@cloudrock/marketplace/common/api';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import {
  isOwnerOrStaff as isOwnerOrStaffSelector,
  isSupport as isSupportSelector,
  isServiceManagerSelector,
} from '@cloudrock/workspace/selectors';

const EditResourceEndDateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "EditResourceEndDateDialog" */ './EditResourceEndDateDialog'
    ),
  'EditResourceEndDateDialog',
);

interface EditResourceEndDateByProviderActionProps {
  resource: Resource;
  reInitResource?(): void;
  refreshList?(): void;
}

export const EditResourceEndDateByProviderAction = ({
  resource,
  reInitResource,
  refreshList,
}: EditResourceEndDateByProviderActionProps) => {
  const dispatch = useDispatch();
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
  const isServiceManager = useSelector(isServiceManagerSelector);
  const isSupport = useSelector(isSupportSelector);

  const callback = () =>
    dispatch(
      openModalDialog(EditResourceEndDateDialog, {
        resolve: {
          resource,
          reInitResource,
          refreshList,
          updateEndDate: updateResourceEndDateByProvider,
        },
        size: 'md',
      }),
    );

  if (!ENV.plugins.CLOUDROCK_MARKETPLACE.ENABLE_RESOURCE_END_DATE) {
    return null;
  }

  return isOwnerOrStaff || isServiceManager || isSupport ? (
    <ActionItem title={translate('Set termination date')} action={callback} />
  ) : null;
};
