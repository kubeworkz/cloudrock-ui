import { triggerTransition } from '@uirouter/redux';
import { call, put, takeEvery } from 'redux-saga/effects';

import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { uploadLogo } from '@cloudrock/customer/details/store/api';
import * as api from '@cloudrock/customer/list/api';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';
import { fetchListStart } from '@cloudrock/table/actions';

import * as constants from '../constants';

function* organizationUpdate(action) {
  try {
    const { image, ...payload } = action.payload;
    yield call(api.updateOrganization, payload);
    if (image) {
      yield call(uploadLogo, {
        customerUuid: payload.uuid,
        image,
      });
    }
    yield put(
      showSuccess(translate('Organization has been updated successfully.')),
    );
    yield put(triggerTransition('support.customers', {}));
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to update organization.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
  }
}

function* organizationLocation(action) {
  try {
    yield call(api.updateOrganization, action.payload);
    yield put(showSuccess(translate('Location has been saved successfully.')));
    yield put(closeModalDialog());
    yield put(fetchListStart(constants.SUPPORT_CUSTOMER_LIST));
  } catch (error) {
    const errorMessage = `${translate('Unable to save location.')} ${format(
      error,
    )}`;
    yield put(showError(errorMessage));
  }
}

export default function* () {
  yield takeEvery(constants.UPDATE_ORGANIZATION, organizationUpdate);
  yield takeEvery(constants.SET_ORGANIZATION_LOCATION, organizationLocation);
}
