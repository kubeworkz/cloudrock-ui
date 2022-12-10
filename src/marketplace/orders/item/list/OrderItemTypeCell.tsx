import { translate } from '@cloudrock/i18n';

export const OrderItemTypeCell = ({ row }) =>
  ({
    Create: translate('Create'),
    Update: translate('Update'),
    Terminate: translate('Terminate'),
  }[row.type]);
