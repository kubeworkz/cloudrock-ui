import Axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { waitForConfirmation } from '@cloudrock/modal/actions';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { fetchListStart } from '@cloudrock/table/actions';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { OFFERING_PERMISSIONS_LIST_ID } from './constants';

interface OfferingPermissionRemoveButtonProps {
  permission: any;
}

export const OfferingPermissionRemoveButton: React.FC<OfferingPermissionRemoveButtonProps> =
  ({ permission }) => {
    const dispatch = useDispatch();
    const customer = useSelector(getCustomer);
    const callback = async () => {
      try {
        await waitForConfirmation(
          dispatch,
          translate('Confirmation'),
          translate('Are you sure you want to revoke this permission?'),
        );
      } catch {
        return;
      }
      try {
        await Axios.delete(permission.url);
        dispatch(showSuccess(translate('Permission has been revoked.')));
        dispatch(
          fetchListStart(OFFERING_PERMISSIONS_LIST_ID, {
            customer_uuid: customer.uuid,
          }),
        );
      } catch (e) {
        dispatch(
          showErrorResponse(e, translate('Unable to revoke permission.')),
        );
      }
    };
    return (
      <ActionButton
        action={callback}
        title={translate('Revoke')}
        icon="fa fa-trash"
      />
    );
  };
