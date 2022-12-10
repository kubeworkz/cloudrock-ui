import { call, put, takeEvery } from 'redux-saga/effects';

import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { translate } from '@cloudrock/i18n';
import * as api from '@cloudrock/issues/security-incident/api';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';

import * as constants from '../constants';

function* reportIncident(action) {
  try {
    const response = yield call(api.reportSecurityIncident, {
      ...action.payload,
    });
    if (action.payload.files) {
      yield call(
        api.uploadAttachments,
        response.data.url,
        action.payload.files,
      );
    }
    yield put(showSuccess('Security incident has been successfully reported.'));
    yield put(constants.REPORT_INCIDENT.success());
    yield put(closeModalDialog());
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to report security incident.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
    yield put(constants.REPORT_INCIDENT.failure());
  }
}

export default function* () {
  yield takeEvery(constants.REPORT_INCIDENT.REQUEST, reportIncident);
}
