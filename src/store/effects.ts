import formActionSaga from 'redux-form-saga';

import authSaga from '@cloudrock/auth/store/effects';
import downloadLinkSaga from '@cloudrock/core/DownloadLink/effects';
import customerDetailsSaga from '@cloudrock/customer/details/store/effects';
import organizationsSaga from '@cloudrock/customer/list/store/effects';
import paymentProfilesSaga from '@cloudrock/customer/payment-profiles/store/effects';
import paymentsSaga from '@cloudrock/customer/payments/store/effects';
import invoicesSaga from '@cloudrock/invoices/store/effects';
import issueAttachmentsSaga from '@cloudrock/issues/attachments/effects';
import issueCommentsSaga from '@cloudrock/issues/comments/effects';
import securityIncidentSaga from '@cloudrock/issues/security-incident/store/effects';
import marketplaceSaga from '@cloudrock/marketplace/store/effects';
import { effects as titleEffects } from '@cloudrock/navigation/title';
import projectSaga from '@cloudrock/project/effects';
import providerSaga from '@cloudrock/providers/effects';
import serviceUsageSaga from '@cloudrock/providers/support/effects';
import resourceSummarySaga from '@cloudrock/resource/summary/effects';
import tableSaga from '@cloudrock/table/effects';
import userSaga from '@cloudrock/user/support/effects';

export default [
  authSaga,
  downloadLinkSaga,
  formActionSaga,
  projectSaga,
  userSaga,
  providerSaga,
  customerDetailsSaga,
  issueAttachmentsSaga,
  issueCommentsSaga,
  securityIncidentSaga,
  tableSaga,
  serviceUsageSaga,
  resourceSummarySaga,
  marketplaceSaga,
  paymentProfilesSaga,
  organizationsSaga,
  invoicesSaga,
  paymentsSaga,
  titleEffects,
];
