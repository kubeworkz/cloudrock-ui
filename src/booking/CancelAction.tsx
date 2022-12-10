import { useSelector, useDispatch } from 'react-redux';

import { translate, formatJsxTemplate } from '@cloudrock/i18n';
import { waitForConfirmation } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import {
  getCustomer,
  isOwnerOrStaff as isOwnerOrStaffSelector,
  isServiceManagerSelector,
} from '@cloudrock/workspace/selectors';

import { rejectBooking } from './api';
import * as constants from './constants';

export const CancelAction = ({ resource, reInitResource }) => {
  const dispatch = useDispatch();
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
  const isServiceManager = useSelector(isServiceManagerSelector);
  const customer = useSelector(getCustomer);
  const isServiceProviderContext = resource.provider_uuid === customer.uuid;

  const callback = async () => {
    try {
      await waitForConfirmation(
        dispatch,
        translate('Cancel booking'),
        translate(
          'Are you sure you want to cancel a {name}?',
          {
            name: <b>{resource.name}</b>,
          },
          formatJsxTemplate,
        ),
      );
    } catch {
      return;
    }
    try {
      const response = await rejectBooking(resource.uuid);
      await reInitResource(response);
      dispatch(showSuccess(translate('Booking has been cancelled.')));
    } catch (e) {
      dispatch(showErrorResponse(e, translate('Unable to cancel booking.')));
    }
  };

  return isServiceManager || isOwnerOrStaff ? (
    <ActionItem
      title={
        isServiceProviderContext ? translate('Reject') : translate('Cancel')
      }
      action={callback}
      disabled={resource.state !== constants.BOOKING_CREATING}
    />
  ) : null;
};
