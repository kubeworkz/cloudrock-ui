import { call, put, select, takeEvery } from 'redux-saga/effects';

import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { Action } from '@cloudrock/core/reducerActions';
import { translate } from '@cloudrock/i18n';
import * as api from '@cloudrock/invoices/api';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';
import { FETCH_LIST_START } from '@cloudrock/table/actions';
import { fetchList } from '@cloudrock/table/effects';
import { getCustomer } from '@cloudrock/workspace/selectors';

import * as constants from '../constants';

function* markInvoiceAsPaid(action: Action<any>) {
  try {
    yield call(api.markAsPaid, action.payload);
    yield put(showSuccess(translate('The invoice has been marked as paid.')));
    yield put(closeModalDialog());
    const customer = yield select(getCustomer);
    yield fetchList({
      type: FETCH_LIST_START,
      payload: {
        table: constants.INVOICES_TABLE,
        extraFilter: {
          customer: customer.url,
        },
      },
    });
  } catch (error) {
    const errorMessage = `${translate(
      'Unable to mark the invoice as paid.',
    )} ${format(error)}`;
    yield put(showError(errorMessage));
  }
}

export default function* () {
  yield takeEvery(constants.MARK_INVOICE_AS_PAID, markInvoiceAsPaid);
}
