import { useSelector, useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { isStaff as isStaffSelector } from '@cloudrock/workspace/selectors';

const MoveResourceDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "MoveResourceDialog" */ './MoveResourceDialog'),
  'MoveResourceDialog',
);

interface MoveResourceActionProps {
  resource: Resource;
  reInitResource?(): void;
  refreshList?(): void;
}

export const MoveResourceAction = ({
  resource,
  reInitResource,
  refreshList,
}: MoveResourceActionProps) => {
  const dispatch = useDispatch();
  const isStaff = useSelector(isStaffSelector);

  const callback = () =>
    dispatch(
      openModalDialog(MoveResourceDialog, {
        resolve: {
          resource,
          reInitResource,
          refreshList,
        },
      }),
    );

  return isStaff ? (
    <ActionItem title={translate('Move')} action={callback} />
  ) : null;
};
