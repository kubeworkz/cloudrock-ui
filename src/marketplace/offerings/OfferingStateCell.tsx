import { translate } from '@cloudrock/i18n';

export const OfferingStateCell = ({ row }) =>
  ({
    Draft: translate('Draft'),
    Active: translate('Active'),
    Paused: translate('Paused'),
    Archived: translate('Archived'),
  }[row.state]);
