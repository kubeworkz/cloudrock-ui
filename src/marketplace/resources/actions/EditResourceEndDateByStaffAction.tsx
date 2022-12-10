import { useDispatch, useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { updateResourceEndDateByStaff } from '@cloudrock/marketplace/common/api';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { isStaff as isStaffSelector } from '@cloudrock/workspace/selectors';

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

export const EditResourceEndDateByStaffAction = ({
  resource,
  reInitResource,
  refreshList,
}: EditResourceEndDateByProviderActionProps) => {
  const dispatch = useDispatch();
  const isStaff = useSelector(isStaffSelector);

  const callback = () =>
    dispatch(
      openModalDialog(EditResourceEndDateDialog, {
        resolve: {
          resource,
          reInitResource,
          refreshList,
          updateEndDate: updateResourceEndDateByStaff,
        },
        size: 'md',
      }),
    );

  if (!ENV.plugins.CLOUDROCK_MARKETPLACE.ENABLE_RESOURCE_END_DATE) {
    return null;
  }

  return isStaff ? (
    <ActionItem
      title={translate('Set termination date (staff)')}
      action={callback}
    />
  ) : null;
};
