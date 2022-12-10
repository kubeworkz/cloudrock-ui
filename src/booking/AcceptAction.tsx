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

import { acceptBooking } from './api';
import * as constants from './constants';

export const AcceptAction = ({ resource, reInitResource }) => {
  const dispatch = useDispatch();
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
  const isServiceManager = useSelector(isServiceManagerSelector);
  const customer = useSelector(getCustomer);
  const isServiceProviderContext = resource.provider_uuid === customer.uuid;

  const callback = async () => {
    try {
      await waitForConfirmation(
        dispatch,
        translate('Accept booking'),
        translate(
          'Are you sure you want to accept a {name}?',
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
      const response = await acceptBooking(resource.uuid);
      await reInitResource(response);
      dispatch(showSuccess(translate('Booking has been accepted.')));
    } catch (e) {
      dispatch(showErrorResponse(e, translate('Unable to accept booking.')));
    }
  };

  return isServiceProviderContext ? (
    <ActionItem
      title={translate('Accept')}
      action={callback}
      disabled={
        resource.state !== constants.BOOKING_CREATING ||
        (!isOwnerOrStaff && !isServiceManager)
      }
    />
  ) : null;
};
