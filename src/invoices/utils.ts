import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

export const formatPeriod = ({ year, month }) =>
  `${year}-${month < 10 ? '0' : ''}${month}`;

export const getTabTitle = () =>
  ({
    accounting: translate('Accounting'),
    billing: translate('Billing'),
  }[ENV.accountingMode]);
