import { FunctionComponent } from 'react';

import { OrderItemDetailsField } from '@cloudrock/marketplace/orders/item/details/OrderItemDetailsField';
import { OrderItemDetailsProps } from '@cloudrock/marketplace/types';
import { BooleanField } from '@cloudrock/table/BooleanField';

const renderValue = (value) => (value ? value : <>&mdash;</>);

export const OfferingConfigurationDetails: FunctionComponent<OrderItemDetailsProps> =
  (props) => {
    const options = props.offering.options.options || {};
    const attributes = props.orderItem.attributes;
    const keys = Object.keys(options).filter(
      (key) => attributes[key] !== undefined,
    );
    return (
      <>
        {keys.map((key, index) => (
          <OrderItemDetailsField label={options[key].label} key={index}>
            {typeof attributes[key] === 'boolean' ? (
              <BooleanField value={attributes[key]} />
            ) : (
              renderValue(attributes[key])
            )}
          </OrderItemDetailsField>
        ))}
      </>
    );
  };
