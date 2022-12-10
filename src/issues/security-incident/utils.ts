import { formValueSelector } from 'redux-form';

import { formatDate } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { REPORT_SECURITY_INCIDENT_FORM_ID } from '@cloudrock/issues/security-incident/constants';
import { RootState } from '@cloudrock/store/reducers';

const SECURITY_INCIDENT_TYPES: string[] = [
  'Phishing',
  'Malware/Spyware',
  'DDOS',
  'Trojan',
  'Man in the middle',
];

export const getSecurityIncidentTypeOptions = () =>
  SECURITY_INCIDENT_TYPES.map((type: string) => ({
    label: translate(type),
    value: type,
  }));

export const reportSecurityIncidentProjectSelector = (state: RootState) =>
  formValueSelector(REPORT_SECURITY_INCIDENT_FORM_ID)(state, 'project');

export const formatDescriptionField = (
  description: string,
  date: string,
  type: string,
): string => `${description}\n
    ${translate('Security incident date: {date}', {
      date: formatDate(date),
    })}\n
    ${translate('Security incident type: {type}', {
      type: type,
    })}`;
