import { createFormAction } from 'redux-form-saga';

export const REPORT_INCIDENT = createFormAction(
  'cloudrock/issues/security-incident/REPORT_INCIDENT',
);

export const REPORT_SECURITY_INCIDENT_FORM_ID = 'ReportSecurityIncident';
