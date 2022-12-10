import { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { post } from '@cloudrock/core/api';
import { translate } from '@cloudrock/i18n';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { getUser } from '@cloudrock/workspace/selectors';

export const SendNotificationButton: FunctionComponent<{ row }> = ({ row }) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  if (!user.is_staff) {
    return null;
  }

  const onClick = async () => {
    try {
      await post(`/invoices/${row.uuid}/send_notification/`);
      dispatch(
        showSuccess(
          translate(
            'Record notification has been sent to organization owners.',
          ),
        ),
      );
    } catch (e) {
      dispatch(
        showErrorResponse(e, translate('Unable to send record notification.')),
      );
    }
  };

  return (
    <ActionButton
      title={translate('Send notification')}
      disabled={row.state !== 'created'}
      icon="fa fa-envelope-o"
      tooltip={
        row.state !== 'created'
          ? translate('Notification can be sent only for created invoice.')
          : ''
      }
      action={onClick}
    />
  );
};
