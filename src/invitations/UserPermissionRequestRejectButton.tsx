import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { rejectPermissionRequest } from '@cloudrock/invitations/api';
import { closeModalDialog, openModalDialog } from '@cloudrock/modal/actions';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';

interface UserPermissionRequestRejectButtonProps {
  permissionRequest: any;
  refreshList;
}

const PermissionRequestActionDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "PermissionRequestActionDialog" */ './PermissionRequestActionDialog'
    ),
  'PermissionRequestActionDialog',
);

const openPermissionRequestActionDialog = (resolve) =>
  openModalDialog(PermissionRequestActionDialog, {
    resolve,
    size: 'md',
  });

export const UserPermissionRequestRejectButton: FunctionComponent<UserPermissionRequestRejectButtonProps> =
  ({ permissionRequest, refreshList }) => {
    const dispatch = useDispatch();

    const submitRequest = async (comment: string) => {
      try {
        await rejectPermissionRequest(permissionRequest.uuid, comment);
        dispatch(
          showSuccess(translate('Permission request has been rejected.')),
        );
        dispatch(closeModalDialog());
        refreshList();
      } catch (e) {
        dispatch(
          showErrorResponse(
            e,
            translate('Unable to reject permission request.'),
          ),
        );
      }
    };

    const callback = () => {
      dispatch(
        openPermissionRequestActionDialog({
          title: translate('Reject permission request by {name}', {
            name: permissionRequest.created_by_full_name,
          }),
          submitRequest,
        }),
      );
    };

    return (
      <ActionButton
        action={callback}
        title={translate('Reject')}
        icon="fa fa-ban"
      />
    );
  };
