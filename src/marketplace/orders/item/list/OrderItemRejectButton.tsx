import React from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { getOrderItem, rejectOrderItem } from '@cloudrock/marketplace/common/api';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { updateEntity } from '@cloudrock/table/actions';

import { TABLE_PUBLIC_ORDERS } from './constants';

interface OrderItemRejectButtonProps {
  uuid: string;
}

export const OrderItemRejectButton: React.FC<OrderItemRejectButtonProps> = (
  props,
) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const handler = React.useCallback(async () => {
    setLoading(true);
    try {
      await rejectOrderItem(props.uuid);
      const newOrderItem = await getOrderItem(props.uuid);
      dispatch(updateEntity(TABLE_PUBLIC_ORDERS, props.uuid, newOrderItem));
      dispatch(showSuccess(translate('Order item has been rejected.')));
    } catch (response) {
      dispatch(
        showErrorResponse(response, translate('Unable to reject order item.')),
      );
    }
    setLoading(false);
  }, [setLoading, dispatch, props.uuid]);
  return (
    <ActionButton
      className="btn btn-sm btn-default"
      title={translate('Reject')}
      action={handler}
      disabled={loading}
      icon={loading ? 'fa fa-spinner fa-spin' : 'fa fa-ban'}
    />
  );
};
