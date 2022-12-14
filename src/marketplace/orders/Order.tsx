import { FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { showPriceSelector } from '@cloudrock/invoices/details/utils';
import { BillingPeriod } from '@cloudrock/marketplace/common/BillingPeriod';

import { getMaxUnit } from '../common/utils';

import { OrderItem } from './item/details/OrderItem';
import './Order.scss';
import { OrderItemResponse } from './types';

interface OrderProps {
  items: OrderItemResponse[];
  editable: boolean;
  onOrderItemRemove?(item: OrderItemResponse): void;
  project_uuid: string;
  customer_uuid: string;
}

export const Order: FunctionComponent<OrderProps> = (props) => {
  const showPrice = useSelector(showPriceSelector);
  const maxUnit = useMemo(() => getMaxUnit(props.items), [props.items]);
  return (
    <>
      <div className="table-responsive order">
        <table className="table">
          <thead>
            <tr>
              <th>{translate('Item')}</th>
              <th>{translate('Item type')}</th>
              {showPrice && (
                <>
                  {maxUnit ? (
                    <th className="text-center">
                      <BillingPeriod unit={maxUnit} />
                    </th>
                  ) : null}
                  <th className="text-center">
                    {translate('Activation price')}
                  </th>
                </>
              )}
              <th className="text-center">{translate('State')}</th>
              <th>{/* Actions column */}</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, index) => (
              <OrderItem
                key={index}
                item={item}
                editable={props.editable}
                project_uuid={props.project_uuid}
                customer_uuid={props.customer_uuid}
                showPrice={showPrice}
                maxUnit={maxUnit}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
