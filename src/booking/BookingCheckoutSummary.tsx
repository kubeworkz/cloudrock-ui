import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OfferingDetailsProps } from '@cloudrock/marketplace/details/OfferingDetails';
import { OfferingPeriodsRenderer } from '@cloudrock/marketplace/details/OfferingPeriodsRenderer';
import { OrderSummary } from '@cloudrock/marketplace/details/OrderSummary';

export const BookingExtraComponent: FunctionComponent<any> = (props) => (
  <>
    {props.formData &&
    props.formData.attributes &&
    Array.isArray(props.formData.attributes.schedules) &&
    props.formData.attributes.schedules.length ? (
      <tr>
        <td>
          {props.formData.attributes.schedules.length === 1 ? (
            <strong>{translate('Period')}</strong>
          ) : (
            <strong>{translate('Periods')}</strong>
          )}
        </td>
        <td>
          <OfferingPeriodsRenderer
            schedules={props.formData.attributes.schedules}
          />
        </td>
      </tr>
    ) : null}
  </>
);

export const BookingCheckoutSummary: FunctionComponent<OfferingDetailsProps> = (
  props,
) => <OrderSummary {...props} extraComponent={BookingExtraComponent} />;
