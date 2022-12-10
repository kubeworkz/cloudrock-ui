import { Calendar } from '@cloudrock/booking/components/calendar/Calendar';
import { withTranslation } from '@cloudrock/i18n';
import { OrderItemDetailsProps } from '@cloudrock/marketplace/types';
import { OfferingConfigurationDetails } from '@cloudrock/support/OfferingConfigurationDetails';

const PureBookingDetails = (props: OrderItemDetailsProps) => {
  const schedules = props.orderItem.attributes.schedules;
  return (
    <>
      <OfferingConfigurationDetails {...props} />
      {schedules && <Calendar events={schedules} />}
    </>
  );
};

export const BookingDetails = withTranslation(PureBookingDetails);
