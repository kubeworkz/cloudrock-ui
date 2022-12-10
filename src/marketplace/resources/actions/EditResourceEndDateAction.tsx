import { useSelector, useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { updateResourceEndDate } from '@cloudrock/marketplace/common/api';
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

interface EditResourceEndDateActionProps {
  resource: Resource;
  reInitResource?(): void;
  refreshList?(): void;
}

export const EditResourceEndDateAction = ({
  resource,
  reInitResource,
  refreshList,
}: EditResourceEndDateActionProps) => {
  const dispatch = useDispatch();
  const isStaff = useSelector(isStaffSelector);

  const callback = () =>
    dispatch(
      openModalDialog(EditResourceEndDateDialog, {
        resolve: {
          resource,
          reInitResource,
          refreshList,
          updateEndDate: updateResourceEndDate,
        },
        size: 'md',
      }),
    );

  if (!ENV.plugins.CLOUDROCK_MARKETPLACE.ENABLE_RESOURCE_END_DATE) {
    return null;
  }

  return isStaff ? (
    <ActionItem title={translate('Set termination date')} action={callback} />
  ) : null;
};
